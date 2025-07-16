package expo.modules.blobmodule

import android.util.Log
import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record
import expo.modules.kotlin.sharedobjects.SharedObject
import expo.modules.kotlin.typedarray.TypedArray
import expo.modules.kotlin.types.EitherOfThree
import expo.modules.kotlin.types.Enumerable

class Blob() : SharedObject() {
    var blobParts: List<InternalBlobPart> = listOf()
    var size: Int = 0
    var options: BlobOptions = BlobOptions()

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
        var s: Int = start - offset
        var e: Int = end - offset
        if (s < 0) {
            s = 0
        }
        if (e > this.size()) {
            e = this.size()
        }
        return when (this) {
            is InternalBlobPart.StringPart -> InternalBlobPart.StringPart(string.substring(s, e))
            is InternalBlobPart.BlobPart -> InternalBlobPart.BlobPart(blob.slice(s, e, ""))
            is InternalBlobPart.BufferPart -> InternalBlobPart.BufferPart(
                buffer.slice(s..<e).toByteArray()
            )
        }
    }

    fun slice(start: Int, end: Int, contentType: String): Blob {
        var i: Int = 0
        var bps: MutableList<InternalBlobPart> = mutableListOf()

        for (bp in blobParts) {
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

typealias BlobPart = EitherOfThree<String, Blob, TypedArray>

private fun TypedArray.bytes(): ByteArray {
    var ba = ByteArray(this.byteLength)

    for (i in 0..<this.byteLength) {
        ba[i] = this.readByte(i)
    }

    return ba
}

const val CR = '\r'
const val LF = '\n'
fun String.toNativeNewlines(): String {
    var i = 0
    var str = ""

    while (i < this.length) {
        if (this[i] == CR) {
            str += LF
            i += 1
            if (i < this.length && this[i] == LF) {
                i += 1
            }
            continue
        }
        str += this[i]
        i += 1
    }
    return str
}

fun List<BlobPart>.internal(nativeNewlines: Boolean): List<InternalBlobPart> {
    return this.map() { bp: BlobPart ->
        if (bp.`is`(String::class)) {
            bp.get(String::class).let {
                val str = if (nativeNewlines) {
                    it.toNativeNewlines()
                } else {
                    it
                }
                InternalBlobPart.StringPart(str)
            }
        } else if (bp.`is`(Blob::class)) {
            bp.get(Blob::class).let {
                InternalBlobPart.BlobPart(it)
            }
        } else {
            bp.get(TypedArray::class).let {
                InternalBlobPart.BufferPart(it.bytes())
            }
        }
    }
}

sealed class InternalBlobPart() {
    data class StringPart(val string: String) : InternalBlobPart()
    data class BlobPart(val blob: Blob) : InternalBlobPart()
    data class BufferPart(val buffer: ByteArray) : InternalBlobPart()

    fun size(): Int {
        return when (this) {
            is StringPart -> string.length
            is BlobPart -> blob.size
            is BufferPart -> buffer.size
        }
    }

    fun text(): kotlin.String {
        return when (this) {
            is StringPart -> string
            is BlobPart -> blob.text()
            is BufferPart -> buffer.decodeToString()
        }
    }
}

enum class EndingType(val str: String = "transparent") : Enumerable {
    TRANSPARENT("transparent"), NATIVE("native"),
}

data class BlobOptions(val type: String = "", val endings: EndingType = EndingType.TRANSPARENT)

class BlobOptionsBag : Record {
    @Field
    val type: String = ""

    @Field
    val endings: EndingType = EndingType.TRANSPARENT
}
