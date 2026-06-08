import re
import cv2
import easyocr
import tempfile
import os


reader = easyocr.Reader(["pt", "en"], gpu=False)


class PlateOCRService:

    @staticmethod
    def extract_plate(image_path: str):
        processed_paths = PlateOCRService._preprocess_image(image_path)

        raw_results = []

        for path in processed_paths:
            results = reader.readtext(
                path,
                detail=1,
                paragraph=False,
                allowlist="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            )

            possible_texts = []

            for result in results:
                text = PlateOCRService._extract_text_from_result(result)
                raw_results.append(str(result))

                if not text:
                    continue

                cleaned_text = PlateOCRService._normalize_text(text)

                if cleaned_text:
                    possible_texts.append(cleaned_text)

            joined_text = "".join(possible_texts)

            texts_to_test = possible_texts + [joined_text]

            for text in texts_to_test:
                plate = PlateOCRService._find_brazilian_plate(text)

                if plate:
                    return plate, raw_results

        return None, raw_results

    @staticmethod
    def _preprocess_image(image_path: str):
        image = cv2.imread(image_path)

        if image is None:
            return [image_path]

        paths = [image_path]

        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

        enlarged = cv2.resize(
            gray,
            None,
            fx=2,
            fy=2,
            interpolation=cv2.INTER_CUBIC
        )

        denoised = cv2.bilateralFilter(enlarged, 11, 17, 17)

        _, threshold = cv2.threshold(
            denoised,
            0,
            255,
            cv2.THRESH_BINARY + cv2.THRESH_OTSU
        )

        adaptive = cv2.adaptiveThreshold(
            denoised,
            255,
            cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
            cv2.THRESH_BINARY,
            31,
            2
        )

        for processed in [gray, enlarged, denoised, threshold, adaptive]:
            temp_file = tempfile.NamedTemporaryFile(
                suffix=".jpg",
                delete=False
            )
            cv2.imwrite(temp_file.name, processed)
            paths.append(temp_file.name)

        return paths

    @staticmethod
    def _extract_text_from_result(result):
        if isinstance(result, str):
            return result

        if isinstance(result, tuple) or isinstance(result, list):
            for item in result:
                if isinstance(item, str):
                    return item

        return None

    @staticmethod
    def _normalize_text(text: str) -> str:
        return re.sub(r"[^A-Z0-9]", "", text.upper())

    @staticmethod
    def _find_brazilian_plate(text: str) -> str | None:
        mercosul_pattern = r"[A-Z]{3}[0-9][A-Z][0-9]{2}"
        old_pattern = r"[A-Z]{3}[0-9]{4}"

        match = re.search(mercosul_pattern, text)

        if match:
            return match.group()

        match = re.search(old_pattern, text)

        if match:
            return match.group()

        return None