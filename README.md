# Proyecto Auditorías SUNAT - Datablitz

## Backend
cd gateway
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 9000

## Frontend
cd frontend
npm install
npm run dev
