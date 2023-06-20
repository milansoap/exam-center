package examcenter.backend.controllers;

import examcenter.backend.models.Exam;
import examcenter.backend.models.ExamExaminee;
import examcenter.backend.models.Examinee;
import examcenter.backend.repository.ExamExamineeRepository;
import examcenter.backend.services.ExamExamineeService;
import examcenter.backend.services.ExamService;
import examcenter.backend.services.ExamineeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/examexaminee")
public class ExamExamineeController {

    private final ExamExamineeRepository examExamineeRepository;
    private final ExamExamineeService examExamineeService;
    private final ExamService examService;
    private final ExamineeService examineeService;

    public ExamExamineeController(ExamExamineeRepository examExamineeRepository, ExamExamineeService examExamineeService, ExamService examService, ExamineeService examineeService) {
        this.examExamineeRepository = examExamineeRepository;
        this.examExamineeService = examExamineeService;
        this.examService = examService;
        this.examineeService = examineeService;
    }

    @GetMapping("/exam/{examId}")
    public List<ExamExaminee> findByExamId(@PathVariable Long examId) {
        return examExamineeService.findByExamId(examId);
    }

    @GetMapping("examinees/{examId}")
    public List<Examinee> findByExamineesByExam(@PathVariable Long examId) {
        return examExamineeService.findExamineesByExam(examId);
    }

    @GetMapping("/examinee/{examineeId}")
    public List<ExamExaminee> findByExamineeId(@PathVariable Long examineeId) {
        return examExamineeService.findByExamineeId(examineeId);
    }

    @PostMapping("/{examId}/{userId}")
    public ResponseEntity<Examinee> addExamExaminee(@PathVariable Long examId, @PathVariable Long userId) {
        System.out.println(examId);
        System.out.println(userId);

        Exam exam = examService.getExamById(examId);
        Examinee examinee = examineeService.getById(userId);
        System.out.println(exam);
        System.out.println(examinee);
          ExamExaminee examExaminee = new ExamExaminee(exam,examinee);
          examExamineeRepository.save(examExaminee);
        return new ResponseEntity<>(examinee, HttpStatus.OK);
    }



}
