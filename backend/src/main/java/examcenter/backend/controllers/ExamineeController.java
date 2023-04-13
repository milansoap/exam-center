package examcenter.backend.controllers;

import examcenter.backend.models.Examinee;
import examcenter.backend.services.ExamineeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/examinees")
public class ExamineeController {
    @Autowired
    private ExamineeService examineeService;

    @GetMapping
    public List<Examinee> getAllExaminees() {
        return examineeService.getAllExaminees();
    }
}
