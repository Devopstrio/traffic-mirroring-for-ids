from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from core.mirroring.engine import TrafficMirroringEngine, IDSEngine

app = FastAPI(title="Traffic Mirroring IDS API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

mirror_engine = TrafficMirroringEngine()
ids_engine = IDSEngine()

@app.get("/health")
def health():
    return {"status": "ok", "service": "traffic-mirroring-ids"}

@app.post("/mirror/start")
def start_mirroring(data: dict = Body(...)):
    source = data.get("source", "vpc-main")
    target = data.get("target", "ids-cluster-01")
    session_id = mirror_engine.start_session(source, target)
    return {"status": "STARTED", "session_id": session_id}

@app.get("/traffic")
def get_traffic_summary():
    sessions = []
    for sid, info in mirror_engine.active_sessions.items():
        dup = mirror_engine.duplicate_traffic(sid)
        sessions.append({
            "session_id": sid,
            "source": info["source"],
            "packets": info["packet_count"],
            "live_rate": dup["packets_mirrored"] if dup else 0
        })
    return {"active_sessions": sessions}

@app.get("/alerts")
def get_ids_alerts():
    # Simulate historical alerts
    return {
        "alerts": [
            {"id": "alt-101", "type": "SQL_INJECTION", "severity": "CRITICAL", "source": "10.0.1.45"},
            {"id": "alt-102", "type": "PORT_SCAN", "severity": "MEDIUM", "source": "192.168.1.10"}
        ]
    }

@app.get("/dashboard/summary")
def get_dashboard_summary():
    return {
        "total_sessions": len(mirror_engine.active_sessions),
        "traffic_volume_gb": 425.8,
        "threats_detected": 14,
        "active_ids_nodes": 3
    }
