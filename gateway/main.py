from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from fastapi.responses import FileResponse
import requests
from reportlab.platypus import SimpleDocTemplate, Paragraph, ListItem, ListFlowable
from reportlab.lib.styles import getSampleStyleSheet

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


API_KEY = "zfTmDzKarcXZxtZDbA0VwPAstRQOLZ6d"
SAP_API_URL = "https://sandbox.api.sap.com/s4hanacloud/sap/opu/odata/sap/API_BUSINESS_PARTNER/A_BusinessPartner?$top=5"


@app.get("/")
def root():
    return {"mensaje": "FastAPI funcionando"}

@app.get("/sap-datos")
def obtener_datos_sap():
    headers = {
        "APIKey": API_KEY,
        "Accept": "application/json"
    }

    try:
        response = requests.get(SAP_API_URL, headers=headers, timeout=10)
        data = response.json()
        partners = data["d"]["results"]

        resultado = []
        for p in partners:
            resultado.append({
                "id": p["BusinessPartner"],
                "nombre": p["BusinessPartnerFullName"]
            })

        return resultado

    except Exception as e:
        return {"error": str(e)}


@app.get("/generar-pdf")
def generar_pdf():
    headers = {
        "APIKey": API_KEY,
        "Accept": "application/json"
    }

    try:
        response = requests.get(SAP_API_URL, headers=headers, timeout=10)
        data = response.json()
        partners = data["d"]["results"]

        file_path = "partners.pdf"
        doc = SimpleDocTemplate(file_path)
        styles = getSampleStyleSheet()
        elements = []

        elements.append(Paragraph("Lista de Business Partners", styles["Title"]))

        lista = []
        for p in partners:
            texto = f'{p["BusinessPartner"]} - {p["BusinessPartnerFullName"]}'
            lista.append(ListItem(Paragraph(texto, styles["Normal"])))

        elements.append(ListFlowable(lista))
        doc.build(elements)

        return FileResponse(file_path, media_type="application/pdf", filename="partners.pdf")

    except Exception as e:
        return {"error": str(e)}