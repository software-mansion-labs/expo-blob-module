
struct Chunk<T> {
    let value: T?
    let isDone: Bool
}

enum ReadableStreamDefaultReaderError: Error {
    case streamCancelled
    case streamLocked
    case streamErrored(message: String)
}

class ReadableStreamDefaultReader {
    var data: [Data]
    var iterator: IndexingIterator<[Data]>
    var isLocked = false
    var isCancelled = false
    var errorState: Error?
    
    init(data: [Data]) {
        self.data = data
        self.iterator = data.makeIterator()
    }
    
    func cancel() {
        isCancelled = true
    }
    
    func closed() {
        // todo
    }
    
    func read() async throws -> Chunk<Data> {
        if self.isCancelled {
            throw ReadableStreamDefaultReaderError.streamCancelled
        }
        if self.isLocked {
            throw ReadableStreamDefaultReaderError.streamLocked
        }
        if let error = self.errorState {
            throw error
        }
        
        isLocked = true
        defer { isLocked = false }

        if let value = iterator.next() {
            return Chunk(value: value, isDone: false)
        } else {
            return Chunk(value: nil, isDone: true)
        }
    }
    
    func releaseLock() {
        self.isLocked = false
        self.iterator = self.data.makeIterator()
    }
}
