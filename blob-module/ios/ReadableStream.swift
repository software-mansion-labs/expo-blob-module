
class ReadableStream {
    var data: [Data]
    var currentIndex = 0
    
    init(data: [Data]) {
        self.data = data
    }
    
    func cancel() {
        // todo
    }
    
    static func from() {
        // todo
    }
    
    func getReader() -> ReadableStreamDefaultReader {
        return ReadableStreamDefaultReader(data: data)
    }
    
    func locked() {
        // todo
    }
    
    func pipeTrough() {
        // todo
    }
    
    func pipeTo() {
        // todo
    }
    
    func tee() {
        // todo
    }
    
    func transferable() {
        // todo
    }
    
}
