export class meetingModel {
  // user's input
  attendees: number;
  meetingDurationHours: number;
  timesPerWeek: number;
  avgAttendeesSalaryPerYear: number;

  // computed attributes
  avgSalaryPerHour: number;
  costPerMeeting: number;

  constructor(
    attendees: number,
    meetingDurationHours: number,
    timesPerWeek: number,
    avgAttendeesSalaryPerYear: number,
  ) {
    this.attendees = attendees;
    this.meetingDurationHours = meetingDurationHours;
    this.timesPerWeek = timesPerWeek;
    this.avgAttendeesSalaryPerYear = avgAttendeesSalaryPerYear;

    // computed attributes
    this.avgSalaryPerHour = avgAttendeesSalaryPerYear / 12 / 174; // one month has 174 work hours
    this.costPerMeeting =
      attendees * meetingDurationHours * timesPerWeek * this.avgSalaryPerHour;
  }

  costPerMinute() {
    return this.costPerMeeting / this.meetingDurationHours / 60;
  }

  costPerYear() {
    // constant is for number of weeks in a year
    return this.costPerMeeting * this.timesPerWeek * 52.1429;
  }
}
