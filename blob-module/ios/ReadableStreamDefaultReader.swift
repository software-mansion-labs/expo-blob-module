class ReadableStreamDefaultReader {
    var data: [Data]
    var currentIndex = 0
    
    init(data: [Data]) {
        self.data = data
    }
    
    func cancel() {
        // todo
    }
    
    func closed() {
        // todo
    }
    
    func read() async throws -> Data {
        guard currentIndex < data.count else { throw NSError(domain: "EndOfStream", code: 1, userInfo: nil) }
        let result = data[currentIndex]
        currentIndex += 1
        return result
    }
    
    func releaseLock() {
        // todo
    }
}
