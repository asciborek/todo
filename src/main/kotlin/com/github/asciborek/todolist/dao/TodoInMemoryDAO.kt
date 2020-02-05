package com.github.asciborek.todolist.dao

import com.github.asciborek.todolist.ToDo
import org.springframework.stereotype.Component
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.ConcurrentMap
import java.util.concurrent.atomic.AtomicInteger

@Component
class TodoInMemoryDAO : TodoDAO {

    private val sequenceGenerator = AtomicInteger()
    private val data: ConcurrentMap<Int, ToDo> = ConcurrentHashMap()

    override fun findById(id: Int): ToDo? {
        return data[id]
    }

    override fun findAll(): Collection<ToDo> {
        return data.values.asSequence().toList()
    }

    override fun save(toDo: ToDo): Int {
        val id = sequenceGenerator.incrementAndGet()
        data[id] = toDo.copy(id = id)
        return id
    }

    override fun setDoneFlag(id: Int, done: Boolean): Boolean {
        val toDo = data[id]
        if (toDo == null) {
            return false
        }
        val newTodo = toDo.copy(done = done)
        data[id] = newTodo
        return true
    }

    override fun delete(id: Int): Boolean {
        val todo = data.remove(id)
        return todo != null
    }
}