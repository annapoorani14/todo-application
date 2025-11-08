package com.example.Helloworld.service;

import com.example.Helloworld.models.Todo;
import com.example.Helloworld.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;

    // ✅ Create Todo
    public Todo createTodo(Todo todo) {
        // Ensure new Todo creation (ignore ID if present)
        todo.setId(null);
        return todoRepository.save(todo);
    }

    // ✅ Get Todo by ID
    public Todo getTodoById(Long id) {
        return todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found with ID: " + id));
    }

    // ✅ Get all Todos (with pagination)
    public Page<Todo> getAllTodosPages(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return todoRepository.findAll(pageable);
    }

    // ✅ Get all Todos (without pagination)
    public List<Todo> getTodos() {
        return todoRepository.findAll();
    }

    // ✅ Update Todo safely
    public Todo updateTodo(long id, Todo todo) {
        Todo existingTodo = getTodoById(id);
        existingTodo.setTitle(todo.getTitle());
        existingTodo.setDescription(todo.getDescription());
        existingTodo.setIsCompleted(todo.getIsCompleted());
        existingTodo.setEmail(todo.getEmail());
        return todoRepository.save(existingTodo);
    }

    // ✅ Delete by ID
    public void deleteTodoById(Long id) {
        Todo existingTodo = getTodoById(id);
        todoRepository.delete(existingTodo);
    }

    // ✅ Delete by object
    public void deleteTodo(Todo todo) {
        todoRepository.delete(todo);
    }
}
