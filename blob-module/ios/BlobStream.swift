
class BlobStream {
    var data: [Data]
    var currentIndex = 0
    
    init(data: [Data]) {
        self.data = data
    }
    
    func getReader() -> BlobStreamReader {
        return BlobStreamReader(data: data)
    }
}

class BlobStreamReader {
    var data: [Data]
    var currentIndex = 0
    
    init(data: [Data]) {
        self.data = data
    }
    
    func readAll() async throws -> Data {
        guard currentIndex < data.count else { throw NSError(domain: "EndOfStream", code: 1, userInfo: nil) }
        let result = data[currentIndex]
        currentIndex += 1
        return result
    }
}
