import re
import easyocr

reader = easyocr.Reader(["pt", "en"], gpu=False)

class PlateOCRService:

    @staticmethod
    def extract_plate(image_path: str) -> str | None:
        results = reader.readtext(image_path)

        possible_texts = []

        for result in results:
            text = results[1]
            cleaned_text = PlateOCRService._normalize_text(text)

            if cleaned_text:
                possible_texts.append(cleaned_text)

        for text in possible_texts:
            plate = PlateOCRService._find_brazilian_plate(text)

            if plate:
                return plate
            
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