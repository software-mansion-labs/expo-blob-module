package expo.modules.blobmodule

import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record
import expo.modules.kotlin.sharedobjects.SharedObject
import expo.modules.kotlin.types.Either

class Blob() : SharedObject() {
    var blobParts: List<InternalBlobPart> = listOf()
    var size : Int = 0
    var options : BlobOptions = BlobOptions()

    constructor(blobParts: List<InternalBlobPart>, options: BlobOptions = BlobOptions()) : this() {
        this.blobParts = blobParts
        this.options = options

        for (bp in blobParts) {
            size += bp.size()
        }
    }

    fun text(): String {
        var str = ""
        for (bp in blobParts) {
            str += bp.text()
        }
        return str
    }

    private fun InternalBlobPart.offsetSlice(start: Int, end: Int, offset: Int): InternalBlobPart {
        var s : Int = start - offset
        var e : Int = end - offset
        if (s < 0) {
            s = 0
        }
        if (e > this.size()) {
            e = this.size()
        }
        return when (this) {
            is InternalBlobPart.String -> InternalBlobPart.String(string.substring(s, e))
            is InternalBlobPart.Blob -> InternalBlobPart.Blob(blob.slice(s, e, ""))
        }
    }

    fun slice(start: Int, end: Int, contentType: String): Blob {
        var i : Int = 0
        var bps : MutableList<InternalBlobPart> = mutableListOf()

        for ( bp in blobParts ) {
            if (i + bp.size() <= start) {
                i += bp.size()
                continue
            }
            if (i >= end) {
                break
            }
            bps.add(bp.offsetSlice(start, end, i))
            i += bp.size()
        }

        return Blob(bps, BlobOptions(contentType))
    }
}

typealias BlobPart = Either<String, Blob>

fun List<BlobPart>.internal(): List<InternalBlobPart> {
    return this.map() { bp : BlobPart ->
        if (bp.`is`(String::class)) {
            bp.get(String::class).let {
                InternalBlobPart.String(it)
            }
        } else {
            bp.get(Blob::class).let {
                InternalBlobPart.Blob(it)
            }
        }
    }
}

sealed class InternalBlobPart() {
    data class String(val string : kotlin.String) : InternalBlobPart()
    data class Blob(val blob : expo.modules.blobmodule.Blob) : InternalBlobPart()

    fun size(): Int {
        return when (this) {
            is String -> string.length
            is Blob -> blob.size
        }
    }

    fun text(): kotlin.String {
        return when (this) {
            is String -> string
            is Blob -> blob.text()
        }
    }
}

enum class EndingType(val str : String = "transparent") {
    TRANSPARENT("transparent"),
    NATIVE("native"),
}

data class BlobOptions(val type: String = "", val endings : EndingType = EndingType.TRANSPARENT)

class BlobOptionsBag : Record {
    @Field
    val type: String = ""
    @Field
    val endings : EndingType = EndingType.TRANSPARENT
}