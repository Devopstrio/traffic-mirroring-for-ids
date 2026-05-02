import uuid
import time
import random

class TrafficMirroringEngine:
    def __init__(self):
        self.active_sessions = {}

    def start_session(self, source_vpc, target_ids):
        session_id = f"mir-{uuid.uuid4().hex[:8]}"
        self.active_sessions[session_id] = {
            "source": source_vpc,
            "target": target_ids,
            "status": "MIRRORING",
            "start_time": time.time(),
            "packet_count": 0
        }
        return session_id

    def duplicate_traffic(self, session_id):
        if session_id not in self.active_sessions:
            return None
        
        # Simulate traffic duplication
        packets = random.randint(100, 5000)
        self.active_sessions[session_id]["packet_count"] += packets
        return {
            "session_id": session_id,
            "packets_mirrored": packets,
            "bytes_mirrored": packets * 1200,
            "timestamp": time.time()
        }

class IDSEngine:
    def __init__(self):
        self.rules = [
            {"id": "RULE-001", "pattern": "SQL_INJECTION", "severity": "HIGH"},
            {"id": "RULE-002", "pattern": "PORT_SCAN", "severity": "MEDIUM"},
            {"id": "RULE-003", "pattern": "XSS_ATTACK", "severity": "HIGH"}
        ]

    def analyze_payload(self, traffic_data):
        # Simulate IDS signature detection
        threats_found = []
        if random.random() > 0.8:
            threat = random.choice(self.rules)
            threats_found.append({
                "alert_id": f"alt-{uuid.uuid4().hex[:6]}",
                "rule_id": threat["id"],
                "pattern": threat["pattern"],
                "severity": threat["severity"],
                "detected_at": time.time()
            })
        return threats_found
