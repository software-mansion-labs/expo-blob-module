
enum ReadableStreamError: Error {
    case streamLocked
}

class ReadableStream {
    var data: [Data]
    var isLocked = false
    
    init(data: [Data]) {
        self.data = data
    }
    
    var locked: Bool {
        return isLocked
    }
    
    func cancel(reason: String?) {
        self.data = []
        isLocked = false
    }
    
    static func from(iterable: [Data]) -> ReadableStream {
        return ReadableStream(data: iterable)
    }
    
    func getReader() throws -> ReadableStreamDefaultReader {
        if self.isLocked {
            throw ReadableStreamError.streamLocked
        }
        isLocked = true
        return ReadableStreamDefaultReader(data: data)
    }
    
}
