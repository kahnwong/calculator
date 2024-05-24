// pricing
// """
// Ref: https://cloud.google.com/kubernetes-engine/pricing
// Unit: USD
// Price: per hour
// Region: asia-southeast1
// """

export class generalPurposeModel {
  vcpu: number;
  memory: number;

  cpu_regular = 0.0549;
  memory_regular = 0.0060729;
  cpu_spot = 0.0165;
  memory_spot = 0.0018219;
  cpu_one_year_commitment = 0.04392;
  memory_one_year_commitment = 0.0048583;
  cpu_three_year_commitment = 0.030195;
  memory_three_year_commitment = 0.0033401;

  constructor(vcpu: number, memory: number) {
    this.vcpu = vcpu;
    this.memory = memory;
  }

  costRegular() {
    return this.vcpu * this.cpu_regular + this.memory * this.memory_regular;
  }

  costSpot() {
    return this.vcpu * this.cpu_spot + this.memory * this.memory_spot;
  }

  costOneYearCommitment() {
    return (
      this.vcpu * this.cpu_one_year_commitment +
      this.memory * this.memory_one_year_commitment
    );
  }

  costThreeYearCommitment() {
    return (
      this.vcpu * this.cpu_three_year_commitment +
      this.memory * this.memory_three_year_commitment
    );
  }
}

export class scaleOutARMModel extends generalPurposeModel {
  cpu_regular = 0.0439;
  memory_regular = 0.0048583;
  cpu_spot = 0.0132;
  memory_spot = 0.0014575;
  cpu_one_year_commitment = 0.03512;
  memory_one_year_commitment = 0.0038866;
  cpu_three_year_commitment = 0.024145;
  memory_three_year_commitment = 0.0026721;
}

export class scaleOutX86Model extends generalPurposeModel {
  cpu_regular = 0.0692;
  memory_regular = 0.0076518;
  cpu_spot = 0.0208;
  memory_spot = 0.0022956;
  cpu_one_year_commitment = 0.05536;
  memory_one_year_commitment = 0.00612144;
  cpu_three_year_commitment = 0.03806;
  memory_three_year_commitment = 0.0042085;
}
