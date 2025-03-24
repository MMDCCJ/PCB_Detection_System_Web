class cfg {
    baseUrl: string;
    DefectType: { [key: number]: string; };
    DefectType_En: { [key: number]: string; };
    constructor() {
        this.baseUrl = "http://localhost:8000";
        this.DefectType = { 0: "漏孔", 1: "鼠咬", 2: "开路", 3: "短路", 4: "余铜", 5: "毛刺" };
        this.DefectType_En = { 0: 'Missing_hole', 1: 'Mouse_bite', 2: 'Open_circuit', 3: 'Short', 4: 'Spurious_copper', 5: 'Spur' }
    }
}
export { cfg }