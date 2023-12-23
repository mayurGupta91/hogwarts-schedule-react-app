// ScheduleGrid.js

import React from 'react';
import PropTypes from 'prop-types';
import Voldemort from './images/voldemort.png';

const ScheduleGrid = ({ students, teachers }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Student</th>
                    <th>Subject</th>
                    <th>Teacher</th>
                </tr>
            </thead>
            <tbody>
                {students.map(student => (
                    <tr key={student.name}>
                        <td>
                            <img src={student.imgSrc} alt="" />
                            <br />
                            {student.name}
                        </td>
                        <td>{Object.keys(student.subjects).join(', ')}</td>
                        <td>
                            {Object.entries(student.subjects).map(([subject, allocatedTeacher]) => {
                                const { imgSrc = Voldemort } = teachers[allocatedTeacher] || {};
                                return (
                                    <div key={subject}>
                                        <img src={imgSrc} alt="" />
                                        <br />
                                        {allocatedTeacher}
                                    </div>
                                );
                            })}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

ScheduleGrid.propTypes = {
    students: PropTypes.array,
    teachers: PropTypes.object.isRequired,
};

export default ScheduleGrid;
