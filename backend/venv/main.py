from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# -------------------- CORS --------------------
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------- IN-MEMORY DB --------------------
projects_db = []

# -------------------- SCHEMAS --------------------

# Input (no id)
class ProjectCreate(BaseModel):
    name: str
    location: str
    budget: float
    status: str

# Output (with id)
class Project(ProjectCreate):
    id: int

# -------------------- ROUTES --------------------

@app.get("/")
def home():
    return {"message": "Govora API Running"}

# GET all projects
@app.get("/projects", response_model=List[Project])
def get_projects():
    return projects_db

# POST create project
@app.post("/projects", response_model=Project)
def create_project(project: ProjectCreate):
    new_project = {
        "id": len(projects_db) + 1,
        "name": project.name,
        "location": project.location,
        "budget": project.budget,
        "status": project.status,
    }

    projects_db.append(new_project)
    return new_project