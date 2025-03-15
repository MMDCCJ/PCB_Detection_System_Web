class cfg {
    baseUrl: string;
    DefectType: { [key: number]: string; };
    constructor() {
        this.baseUrl = "http://localhost:8000";
        this.DefectType = { 0: "漏孔", 1: "鼠咬", 2: "开路", 3: "短路", 4: "余铜", 5: "毛刺" }
    }
}
export { cfg }