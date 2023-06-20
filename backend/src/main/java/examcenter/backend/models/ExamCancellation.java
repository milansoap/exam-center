package examcenter.backend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "exam_cancellations")
public class ExamCancellation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @JoinColumn(name = "exam_id")
    private Long examId;

    @Column(name = "reason")
    private String reason;

    public ExamCancellation(long examId, String reason) {
        this.examId = examId;
        this.reason = reason;
    }

    public ExamCancellation() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public long getExamId() {
        return examId;
    }

    public void setExamId(long examId) {
        this.examId = examId;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    @Override
    public String toString() {
        return "ExamCancellation{" +
                "id=" + id +
                ", examId=" + examId +
                ", reason='" + reason + '\'' +
                '}';
    }
}
