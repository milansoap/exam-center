package examcenter.backend.controllers;

import examcenter.backend.models.Exam;
import examcenter.backend.models.ExamCancellation;
import examcenter.backend.repository.ExamCancellationRepository;
import examcenter.backend.services.ExamService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cancellations")
public class ExamCancellationController {

    private final ExamCancellationRepository cancellationRepository;
    private final ExamService examService;
    public ExamCancellationController(ExamCancellationRepository cancellationRepository, ExamService examService) {
        this.cancellationRepository = cancellationRepository;
        this.examService = examService;
    }


    @PostMapping
    public ResponseEntity<ExamCancellation> addCancellation(@RequestBody ExamCancellation examCancellation) {
        System.out.println(examCancellation);
        Exam exam = examService.getExamById(examCancellation.getExamId());
        exam.setCancelled(true);
        cancellationRepository.save(examCancellation);
        System.out.println(exam);
        return new ResponseEntity<>(examCancellation, HttpStatus.CREATED);
    }


}
