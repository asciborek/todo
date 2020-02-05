package com.github.asciborek.todolist.dao

import com.github.asciborek.todolist.ToDo

interface TodoDAO {

    fun findById(id: Int) : ToDo?

    fun findAll() : Collection<ToDo>

    fun save(toDo: ToDo) : Int

    fun setDoneFlag(id: Int, done: Boolean) : Boolean

    fun delete(id: Int) : Boolean

}