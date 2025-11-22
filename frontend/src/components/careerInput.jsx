import { useState } from 'react';

const AVAILABLE_ROLES = [
    'Frontend Developer',
    'Backend Developer',
    'Data Analyst',
    'Full Stack Developer',
    'DevOps Engineer'
];

function CareerInput({ onAnalyze, loading }) {
    const [targetRole, setTargetRole] = useState('');
    const [skillInput, setSkillInput] = useState('');
    const [currentSkills, setCurrentSkills] = useState([]);

    const handleAddSkill = () => {
        const skill = skillInput.trim();
        // Check if input contains commas - split by comma
        if (skill.includes(',')) {
            const skills = skill
                .split(',')
                .map(s => s.trim())
                .filter(s => s && !currentSkills.includes(s));
            
            if (skills.length > 0) {
                setCurrentSkills([...currentSkills, ...skills]);
            }
        } else if (skill && !currentSkills.includes(skill)) {
            // Single skill
            setCurrentSkills([...currentSkills, skill]);
        }
            setSkillInput('');
        
    };

    const handleRemoveSkill = (skillToRemove) => {
        setCurrentSkills(currentSkills.filter(skill => skill !== skillToRemove));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddSkill();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (targetRole && currentSkills.length > 0) {
            onAnalyze(targetRole, currentSkills);
        }
    };
    
    const handleReset = () => {
        // Clear form state
        setTargetRole('');
        setSkillInput('');
        setCurrentSkills([]);
        
        // Clear localStorage
        localStorage.removeItem('lastAnalysis');
        localStorage.removeItem('lastRoadmap');
        localStorage.removeItem('lastNews');
        
        // Reload page to reset all components
        window.location.reload();
    };
    const isFormValid = targetRole && currentSkills.length > 0;

    return (
        <div className="card bg-base-100 shadow-xl mb-8 w-3/4 md:w-1/2">
            <div className="card-body ">
                <h2 className="card-title text-2xl mb-4">Enter Your Career Goals</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text font-semibold">Target Role</span>
                        </label>
                        <select
                            className="select select-bordered w-full"
                            value={targetRole}
                            onChange={(e) => setTargetRole(e.target.value)}
                            disabled={loading}
                        >
                            <option value="">Select a role...</option>
                            {AVAILABLE_ROLES.map(role => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text font-semibold">Current Skills</span>
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                className="input input-bordered flex-1"
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type a skill and press Enter..."
                                disabled={loading}
                            />
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleAddSkill}
                                disabled={loading || !skillInput.trim()}
                            >
                                Add
                            </button>
                        </div>

                        {currentSkills.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                {currentSkills.map(skill => (
                                    <div key={skill} className="badge badge-primary badge-lg gap-2">
                                        {skill}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveSkill(skill)}
                                            className="btn btn-ghost btn-xs btn-circle"
                                            disabled={loading}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className='flex flex-col items-center gap-4'>
                        <button
                            type="submit"
                            className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
                            disabled={!isFormValid || loading}
                        >
                            {loading ? 'Analyzing...' : '🔍 Analyze My Career Path'}
                        </button>


                        <button
                            type="Reset"
                            className={`btn btn-primary w-1/4  ${loading ? 'loading' : ''}`}
                            onClick={handleReset}
                            disabled={loading}
                        >
                            RESET
                        </button>
                    </div>



                </form>
            </div>
        </div>
    );
}

export default CareerInput;