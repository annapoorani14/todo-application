package com.example.Helloworld.repository;

import com.example.Helloworld.models.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

//import org.springframework.stereotype.Component;
//@Component
public interface TodoRepository extends JpaRepository<Todo, Long> {
}
