# School Domain

## Overview

The School domain is the foundation of NR LMS.

Every academic and business record belongs to exactly one school.

This module supports multi-tenant architecture, allowing multiple schools to use the same NR LMS platform while keeping their data isolated.

---

# Modules

* Schools
* School Settings
* Academic Years
* Classes
* Sections
* Subjects

# Schools Table

## Purpose

Stores information about every school registered in NR LMS.

Each school acts as an independent tenant.

---

## Columns

id

name

code

email

phone

website

logo_url

address

city

state

country

postal_code

status

created_at

updated_at

deleted_at

---

## Business Rules

* School code must be unique.
* One school can have many academic years.
* One school can have many teachers.
* One school can have many students.
* One school can have many classes.
* Soft delete enabled.


# School Settings

## Purpose

Stores configurable settings for each school.

Each school has exactly one settings record.

---

## Settings

Student ID Format

Employee ID Format

Admission Number Format

Academic Year Format

Date Format

Time Zone

Language

Currency

Logo

Theme Color

WhatsApp Enabled

Parent Portal Enabled

Student Portal Enabled

Teacher Portal Enabled

Exam Module Enabled

Attendance Module Enabled


# Academic Years

Example

2026-2027

2027-2028

2028-2029

---

Business Rules

Only one Academic Year can be Active.

A school can have multiple Academic Years.

Students belong to one Academic Year.

Classes belong to one Academic Year.


# Classes

Examples

Nursery

LKG

UKG

Class 1

Class 2

...

Class 10

---

Business Rules

Each class belongs to one school.

Each class belongs to one Academic Year.

A class can have multiple Sections.



# Sections

Examples

A

B

C

D

---

Business Rules

A section belongs to one Class.

A section has one Class Teacher.

A section has many Students.


# Subjects

Examples

English

Mathematics

Science

Social

Hindi

Computer Science

General Knowledge

---

Business Rules

Subjects belong to a School.

Teachers can teach multiple Subjects.

One Subject can be assigned to multiple Classes.
