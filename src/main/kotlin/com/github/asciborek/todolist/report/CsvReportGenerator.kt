package com.github.asciborek.todolist.report

import com.github.asciborek.todolist.ToDo
import com.github.asciborek.todolist.dao.TodoDAO
import org.springframework.stereotype.Component

@Component
class CsvReportGenerator constructor(val todoDAO: TodoDAO) : ReportGenerator {

    companion object {
        const val headers = "title,dueDate,done,priority"
    }

    override fun createReport(): ByteArray {
        val items = todoDAO.findAll()
                .sortedBy { todo -> todo.dueDate }
                .map(::mapItem)
                .toList();

        val stringBuilder = StringBuilder(headers).appendln();
        for (item in items) {
            stringBuilder.appendln(item)
        }
        return stringBuilder.toString().toByteArray();
    }

    override fun getSupportedExtension(): Extension {
        return Extension.CSV;
    }

    private fun mapItem(item: ToDo): String {
        return "${item.title}, ${item.dueDate}, ${item.done}, ${item.priority}";
    }
}