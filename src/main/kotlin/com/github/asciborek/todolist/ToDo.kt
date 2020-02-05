package com.github.asciborek.todolist

import java.time.LocalDateTime


data class ToDo(val id: Int?, val title: String, val dueDate: LocalDateTime, val done: Boolean = false, val priority: Priority = Priority.NORMAL)


enum class Priority {
    LOW, NORMAL, HIGH
}

