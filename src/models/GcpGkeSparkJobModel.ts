import { generalPurposeModel, scaleOutARMModel } from './GcpGkeModel';

export class sparkGeneralPurposeModel extends generalPurposeModel {
  executors: number;
  jobDurationHour: number;

  constructor(
    vcpu: number,
    memory: number,
    executors: number,
    jobDurationHour: number,
  ) {
    super(vcpu, memory);
    this.executors = executors;
    this.jobDurationHour = jobDurationHour;
  }

  costSpotJob() {
    return this.costSpot() * this.jobDurationHour * (1 + this.executors);
  }
}

export class sparkScaleOutARMModel extends scaleOutARMModel {
  executors: number;
  jobDurationHour: number;

  constructor(
    vcpu: number,
    memory: number,
    executors: number,
    jobDurationHour: number,
  ) {
    super(vcpu, memory);
    this.executors = executors;
    this.jobDurationHour = jobDurationHour;
  }

  costSpotJob() {
    return this.costSpot() * this.jobDurationHour * (1 + this.executors);
  }
}
