package com.devsuperior.dsmovie.controllers;

import com.devsuperior.dsmovie.entities.Movie;
import com.devsuperior.dsmovie.services.ReportService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.devsuperior.dsmovie.dto.MovieDTO;
import com.devsuperior.dsmovie.services.MovieService;

import java.io.ByteArrayInputStream;
import java.util.Optional;


@RestController
@RequestMapping(value = "/movies")
public class MovieController {

    @Autowired
    private MovieService service;
    @Autowired
    private ReportService reportService;


    @GetMapping
    public Page<MovieDTO> findAll(Pageable pageable) {
        return service.findAll(pageable);
    }

    @GetMapping(value = "/{id}")
    public MovieDTO findById(@PathVariable Long id) {
        return service.findByIdDto(id);
    }

    @PostMapping("/register")
    @ResponseBody
    public ResponseEntity<Object> saveMovie(@RequestBody MovieDTO movieDTO) {
       var movie = new Movie();
        BeanUtils.copyProperties(movieDTO, movie);
        return ResponseEntity.status(HttpStatus.CREATED).body(service.saveMovie(movie));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateMovie(@PathVariable(value = "id") long id,
                                                    @RequestBody MovieDTO movieDTO){

        Optional<Movie> movieId = service.findById(id);
        if (!movieId.isPresent() ) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Movie not found.");
        }

        var movieEntity = new Movie();
        BeanUtils.copyProperties(movieDTO, movieEntity);
        movieEntity.setId(movieId.get().getId());
//        movieEntity.setImage(movieId.get().getImage());
//        movieEntity.setTrailer(movieId.get().getTrailer());
        return ResponseEntity.status(HttpStatus.OK).body(service.saveMovie(movieEntity));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteMovie(@PathVariable(value = "id") long id){
        Optional<Movie> movieId = service.findById(id);
        if (!movieId.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Movie not found");
        }
        service.deleteMovie(movieId.get());
        return ResponseEntity.status(HttpStatus.OK).body("Movie deleted sucessfully.");
    }

    @GetMapping("/export-movies")
    public ResponseEntity<InputStreamResource> exportAllData() throws Exception {
        ByteArrayInputStream stream = reportService.exportAllData();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=movies.xls");

        return ResponseEntity.ok().headers(headers).body(new InputStreamResource(stream));
    }

}