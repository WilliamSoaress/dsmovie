package com.devsuperior.dsmovie.controllers;

import com.devsuperior.dsmovie.entities.Movie;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.devsuperior.dsmovie.dto.MovieDTO;
import com.devsuperior.dsmovie.services.MovieService;

@RestController
@RequestMapping(value = "/movies")
public class MovieController {

    @Autowired
    private MovieService service;

    @GetMapping
    public Page<MovieDTO> findAll(Pageable pageable) {
        return service.findAll(pageable);
    }

    @GetMapping(value = "/{id}")
    public MovieDTO findById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping("/register")
    @ResponseBody
    public ResponseEntity<Object> saveMovie(@RequestBody MovieDTO movieDTO) {
       var movie = new Movie();
        BeanUtils.copyProperties(movieDTO, movie);
        return ResponseEntity.status(HttpStatus.CREATED).body(service.saveMovie(movie));
    }
}