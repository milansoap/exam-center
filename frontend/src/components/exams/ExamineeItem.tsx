import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Examinee } from "../../models/Examinee";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface ExamineeProp {
    examinee: Examinee;
}

function ExamineeItem({ examinee }: ExamineeProp) {
    return (
        <>
            <div className="outlayItem">
                <div className="insideItem">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="left-content">
                            <h3 className="m-1">{examinee.firstName} {examinee.lastName}</h3>
                            <p className="mb-1">{examinee.address}</p>
                            <small>{examinee.dateOfBirth.toString()}</small>
                        </div>
                        <div className="right-content">
                            <div className="icon-container">
                            <FontAwesomeIcon icon={faUser} size="5x" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ExamineeItem;