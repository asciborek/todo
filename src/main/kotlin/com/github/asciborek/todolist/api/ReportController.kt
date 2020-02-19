package com.github.asciborek.todolist.api

import com.github.asciborek.todolist.report.Extension
import com.github.asciborek.todolist.report.ReportGenerator
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
class ReportController(generators: List<ReportGenerator>) {

    private val generators: Map<Extension, ReportGenerator>;

    companion object {
        private val MEDIA_TYPE_CSV = MediaType.parseMediaType("text/csv")
        val extensionsMediaTypes = mapOf(Extension.CSV to MEDIA_TYPE_CSV, Extension.PDF to MediaType.APPLICATION_PDF);
    }

    init {
        this.generators = generators.associateBy(keySelector = { generator -> generator.getSupportedExtension() }, valueTransform = { reportGenerator -> reportGenerator })
    }

    @GetMapping("/report")
    fun generateReport(@RequestParam fileExtension: String): ResponseEntity<ByteArray> {
        val extension = Extension.valueOf(fileExtension.toUpperCase());
        val generator = generators[extension] ?: throw IllegalStateException()
        return ResponseEntity.ok()
                .contentType(extensionsMediaTypes.getOrDefault(extension, defaultValue = MediaType.ALL))
                .body(generator.createReport())
    }

}