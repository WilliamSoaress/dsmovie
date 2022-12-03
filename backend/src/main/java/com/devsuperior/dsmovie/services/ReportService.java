package com.devsuperior.dsmovie.services;

import com.devsuperior.dsmovie.entities.Movie;
import com.devsuperior.dsmovie.repositories.MovieRepository;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
public class ReportService {

    @Autowired
    private MovieService movieService;

    @Autowired
    private MovieRepository movieRepository;

    @Transactional
    public ByteArrayInputStream exportAllData() throws Exception {
        String[] columns = { "Id", "Contador", "Imagem", "Pontuação", "Título" };

        Workbook workbook = new HSSFWorkbook();
        ByteArrayOutputStream stream = new ByteArrayOutputStream();

        Sheet sheet = workbook.createSheet("Movies");
        Row row = sheet.createRow(0);

        for (int i = 0; i < columns.length; i++) {
            Cell cell = row.createCell(i);
            cell.setCellValue(columns[i]);
        }

        List<Movie> movies = movieRepository.findAll();
        int initRow = 1;
        for (Movie movie : movies) {
            row = sheet.createRow(initRow);
            row.createCell(0).setCellValue(movie.getId());
            row.createCell(1).setCellValue(movie.getCount());
            row.createCell(2).setCellValue(movie.getImage());
            row.createCell(3).setCellValue(movie.getScore());
            row.createCell(4).setCellValue(movie.getTitle());

            initRow++;
        }

        workbook.write(stream);
        workbook.close();
        return new ByteArrayInputStream(stream.toByteArray());
    }
}
