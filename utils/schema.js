import { boolean, date, datetime, decimal, float, int, mysqlEnum, mysqlTable, primaryKey, text, time, timestamp, varchar } from "drizzle-orm/mysql-core";

export const INTERVIEW_EXPERIENCE = mysqlTable('interview_experience', {
    id: int('id').autoincrement().notNull().primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    course: varchar('course', { length: 100 }).notNull(),
    branch: varchar('branch', { length: 100 }).notNull(),
    yearOfPassout: int('year_of_passout').notNull(),
    cgpa: decimal('cgpa', { precision: 3, scale: 2 }).notNull(), 
    contactNo: varchar('contact_no', { length: 15 }).default(null),
    linkedinProfile: varchar('linkedin_profile', { length: 255 }).notNull(),
    company: varchar('company', { length: 100 }).notNull(),
    jobProfile: varchar('job_profile', { length: 100 }).notNull(),
    jobLocation: varchar('job_location', { length: 100 }).notNull(),
    packageOffered: decimal('package_offered', { precision: 10, scale: 2 }).notNull(), 
    studentsHired: int('students_hired').notNull(),
    rounds: int('rounds').notNull(),
    skillsAsked: text('skills_asked').notNull(),
    experience: text('experience').notNull(),
    interviewLevel: mysqlEnum('interview_level', ['Easy', 'Moderate', 'Hard']).notNull()
});