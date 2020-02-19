package com.github.asciborek.todolist.report

import com.github.asciborek.todolist.ToDo
import com.github.asciborek.todolist.dao.TodoDAO
import com.itextpdf.text.Document
import com.itextpdf.text.pdf.PdfPTable
import com.itextpdf.text.pdf.PdfWriter
import org.springframework.stereotype.Component
import java.io.ByteArrayOutputStream
import java.io.IOException

@Component
class PdfReportGenerator(private val todoDAO: TodoDAO) : ReportGenerator {

    override fun createReport(): ByteArray {
        val items = todoDAO.findAll()
        val document = Document()
        var blob: ByteArray
        val outputStream = ByteArrayOutputStream()
        try {
            val pdfWriter = PdfWriter.getInstance(document, outputStream)
            document.addLanguage("en-US")
            document.addTitle("Todo List Report")
            pdfWriter.createXmpMetadata()
            document.open()
            val table = createTable()
            items.forEach { item -> addItem(item, table) }
            document.add(table)
            document.close()
            blob = outputStream.toByteArray()
        } catch (e: IOException) {
            blob = ByteArray(0)
        } finally {
            outputStream.close()
        }
        return blob
    }

    fun createTable(): PdfPTable {
        val table = PdfPTable(4)
        table.addCell("Title")
        table.addCell("Due Date")
        table.addCell("Done")
        table.addCell("Priority")
        return table
    }

    fun addItem(item: ToDo, table: PdfPTable) {
        table.addCell(item.title)
        table.addCell(item.dueDate.toString())
        table.addCell(item.done.toString())
        table.addCell(item.priority.toString())
    }

    override fun getSupportedExtension(): Extension {
        return Extension.PDF
    }
}