package com.example.Helloworld.models;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Todo Entity - Represents a task with title, description, completion status, and user email.
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Unique identifier of the Todo", example = "1")
    private Long id;

    @NotBlank(message = "Title cannot be blank")
    @Schema(description = "Title of the Todo task", example = "Complete Spring Boot Project")
    private String title;

    @Schema(description = "Detailed description of the Todo task", example = "Finish the Todo CRUD module")
    private String description;

    @Schema(description = "Indicates whether the task is completed", example = "false")
    private Boolean isCompleted = false;

    @Email(message = "Please enter a valid email")
    @Schema(description = "Email of the user associated with this Todo", example = "user@example.com")
    private String email;

    @Column(updatable = false)
    @Schema(description = "Timestamp when the Todo was created", example = "2025-11-07T14:45:00")
    private LocalDateTime createdAt;

    /**
     * Automatically set createdAt timestamp before saving.
     */
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
