import React, { useState, useEffect, useContext } from "react";
import Steps from "rsuite/Steps";

import { JobContext } from "../../../helpers/JobContext";

import "rsuite/dist/rsuite.min.css";

const StepsContainer = (props) => {
  const { job } = props;
  const [step, setStep] = useState(null);

  const { updateActivity, URL, getJobs } = useContext(JobContext);

  useEffect(() => {
    setStep(job.stageOfApplication);
  }, [job.stageOfApplication, step]);

  const onChange = (nextStep) => {
    if (nextStep < 0) {
      nextStep = 0;
    } else if (nextStep > 3) {
      nextStep = 3;
    }
    updateStageOfApplication(job._id, nextStep);
  };

  const onNext = () => {
    onChange(step + 1);
  };
  const onPrevious = () => {
    onChange(step - 1);
  };

  const updateStageOfApplication = async (id, step) => {
    const res = await fetch(`${URL}/stage/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ step }),
    });

    await res.json();
    updateActivity(job._id);
    getJobs(job._id);
  };

  return (
    <div>
      <Steps
        vertical
        current={job.stageOfApplication}
        currentStatus="process"
        className="steps-steps"
      >
        <Steps.Item
          title="Complete"
          description={`Applied to job on ${job.dateAppliedReadable}`}
          className={job.stageOfApplication === 0 ? "steps-active" : ""}
        />
        <Steps.Item
          title={job.stageOfApplication <= 1 ? "In Progress" : "Complete"}
          description="First Interview"
          className={job.stageOfApplication === 1 ? "steps-active" : ""}
        />
        <Steps.Item
          title={job.stageOfApplication <= 2 ? "In Progress" : "Complete"}
          description="Second Interview"
          className={job.stageOfApplication === 2 ? "steps-active" : ""}
        />
        <Steps.Item
          title={job.stageOfApplication === 3 ? "Got the Job!" : "In Progress"}
          description="Received offer"
          className={job.stageOfApplication === 3 ? "steps-active" : ""}
        />
      </Steps>
      <div className="steps-btn-group">
        <button onClick={onPrevious} disabled={step === 0}>
          {"< Previous Step"}
        </button>
        <button onClick={onNext} disabled={step === 3}>
          {"Next Step >"}
        </button>
      </div>
    </div>
  );
};

export default StepsContainer;
