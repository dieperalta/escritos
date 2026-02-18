from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from fastapi.responses import FileResponse
import requests
from reportlab.platypus import SimpleDocTemplate, Paragraph, ListItem, ListFlowable
from reportlab.lib.styles import getSampleStyleSheet
from fastapi import Query
from fastapi import Body
from reportlab.platypus import Image, Spacer
import base64
from io import BytesIO

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


@app.post("/generar-pdf")
def generar_pdf(data: dict = Body(...)):

    proveedor = data.get("proveedor", "XXX")
    factura = data.get("factura", "XXX")
    precio = data.get("precio", "XXX")
    imagen_base64 = data.get("imagen")

    file_path = "reporte.pdf"
    doc = SimpleDocTemplate(file_path)
    styles = getSampleStyleSheet()
    elements = []

    elements.append(Paragraph(
        "Punto 6: Crédito fiscal por operaciones que no cumplen con el Principio de Causalidad (S/ 371,073.00)",
        styles["Title"]
    ))

    texto = f"""
    SUNAT desconoce el crédito fiscal relacionado al IGV efectivamente cancelado por nuestra empresa por concepto de las regalías pagadas a nuestro proveedor <font color="red">{proveedor}</font>,
    empresa domiciliada en Chile, mediante las facturas Nos. <font color="red">{factura}</font>.

    Precios <font color="red">{precio}</font>
    """

    elements.append(Paragraph(texto, styles["Normal"]))
    elements.append(Spacer(1, 20))

    # Insertar imagen si existe
    if imagen_base64:
        header, encoded = imagen_base64.split(",", 1)
        imgdata = base64.b64decode(encoded)
        image = Image(BytesIO(imgdata), width=300, height=200)
        elements.append(image)

    doc.build(elements)

    return FileResponse(file_path, media_type="application/pdf", filename="reporte.pdf")
