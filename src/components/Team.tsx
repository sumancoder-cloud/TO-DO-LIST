import React, { useState, useEffect } from 'react';
import { UserPlusIcon, UserGroupIcon, ChartBarIcon, CalendarIcon, XMarkIcon, EnvelopeIcon, PhoneIcon, ChatBubbleLeftRightIcon, BellIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { TeamMember, PerformanceMetrics, TeamStats } from '../types/team';
import NotificationService from '../services/notificationService';

const Team: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [teamStats, setTeamStats] = useState<TeamStats>({
    totalMembers: 0,
    totalTasks: 0,
    completedTasks: 0,
    teamProductivity: 0,
    averageTaskCompletionTime: 0,
    onTimeDeliveryRate: 0,
    qualityScore: 0,
    collaborationScore: 0,
    skillDistribution: [],
  });
  const [showAddMember, setShowAddMember] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    skills: '',
  });

  // Simulate fetching team data
  useEffect(() => {
    const fetchTeamData = async () => {
      const mockData: TeamMember[] = [
        {
          id: '1',
          name: 'Sarah Chen',
          role: 'Product Manager',
          email: 'sarah.chen@example.com',
          phone: '+1 234 567 8901',
          avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=random',
          tasksCompleted: 78,
          tasksPending: 3,
          productivity: 95,
          joinDate: '2023-01-15',
          skills: ['Product Management', 'Agile', 'User Research', 'Data Analysis'],
          notifications: true,
          performanceMetrics: {
            averageTaskCompletionTime: 1.8,
            onTimeDeliveryRate: 98,
            qualityScore: 95,
            collaborationScore: 92,
            lastEvaluationDate: '2024-01-15',
            skillImprovements: [
              { skill: 'Product Strategy', improvement: 20, lastUpdated: '2024-01-15' },
              { skill: 'Data Analysis', improvement: 15, lastUpdated: '2024-01-15' },
            ],
          },
        },
        {
          id: '2',
          name: 'Michael Rodriguez',
          role: 'Senior Developer',
          email: 'michael.r@example.com',
          phone: '+1 234 567 8902',
          avatar: 'https://ui-avatars.com/api/?name=Michael+Rodriguez&background=random',
          tasksCompleted: 65,
          tasksPending: 5,
          productivity: 88,
          joinDate: '2023-03-20',
          skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
          notifications: true,
          performanceMetrics: {
            averageTaskCompletionTime: 2.2,
            onTimeDeliveryRate: 92,
            qualityScore: 94,
            collaborationScore: 90,
            lastEvaluationDate: '2024-01-15',
            skillImprovements: [
              { skill: 'System Architecture', improvement: 18, lastUpdated: '2024-01-15' },
              { skill: 'Team Leadership', improvement: 12, lastUpdated: '2024-01-15' },
            ],
          },
        },
        {
          id: '3',
          name: 'Emma Wilson',
          role: 'UX Designer',
          email: 'emma.w@example.com',
          phone: '+1 234 567 8903',
          avatar: 'https://ui-avatars.com/api/?name=Emma+Wilson&background=random',
          tasksCompleted: 52,
          tasksPending: 4,
          productivity: 91,
          joinDate: '2023-06-10',
          skills: ['UI/UX Design', 'Figma', 'User Research', 'Prototyping'],
          notifications: true,
          performanceMetrics: {
            averageTaskCompletionTime: 2.0,
            onTimeDeliveryRate: 94,
            qualityScore: 96,
            collaborationScore: 89,
            lastEvaluationDate: '2024-01-15',
            skillImprovements: [
              { skill: 'Design Systems', improvement: 25, lastUpdated: '2024-01-15' },
              { skill: 'User Research', improvement: 15, lastUpdated: '2024-01-15' },
            ],
          },
        },
        {
          id: '4',
          name: 'David Kim',
          role: 'DevOps Engineer',
          email: 'david.kim@example.com',
          phone: '+1 234 567 8904',
          avatar: 'https://ui-avatars.com/api/?name=David+Kim&background=random',
          tasksCompleted: 45,
          tasksPending: 2,
          productivity: 93,
          joinDate: '2023-08-05',
          skills: ['Docker', 'Kubernetes', 'CI/CD', 'Cloud Infrastructure'],
          notifications: true,
          performanceMetrics: {
            averageTaskCompletionTime: 1.5,
            onTimeDeliveryRate: 97,
            qualityScore: 95,
            collaborationScore: 91,
            lastEvaluationDate: '2024-01-15',
            skillImprovements: [
              { skill: 'Cloud Architecture', improvement: 22, lastUpdated: '2024-01-15' },
              { skill: 'Automation', improvement: 18, lastUpdated: '2024-01-15' },
            ],
          },
        },
        {
          id: '5',
          name: 'Sophia Patel',
          role: 'QA Engineer',
          email: 'sophia.p@example.com',
          phone: '+1 234 567 8905',
          avatar: 'https://ui-avatars.com/api/?name=Sophia+Patel&background=random',
          tasksCompleted: 60,
          tasksPending: 3,
          productivity: 89,
          joinDate: '2023-10-15',
          skills: ['Test Automation', 'Quality Assurance', 'Performance Testing', 'Security Testing'],
          notifications: true,
          performanceMetrics: {
            averageTaskCompletionTime: 1.9,
            onTimeDeliveryRate: 93,
            qualityScore: 97,
            collaborationScore: 88,
            lastEvaluationDate: '2024-01-15',
            skillImprovements: [
              { skill: 'Test Automation', improvement: 20, lastUpdated: '2024-01-15' },
              { skill: 'Security Testing', improvement: 15, lastUpdated: '2024-01-15' },
            ],
          },
        }
      ];

      setTeamMembers(mockData);
      updateTeamStats(mockData);
    };

    fetchTeamData();
  }, []);

  const updateTeamStats = (members: TeamMember[]) => {
    const stats: TeamStats = {
      totalMembers: members.length,
      totalTasks: members.reduce((acc, member) => acc + member.tasksCompleted + member.tasksPending, 0),
      completedTasks: members.reduce((acc, member) => acc + member.tasksCompleted, 0),
      teamProductivity: Math.round(members.reduce((acc, member) => acc + member.productivity, 0) / members.length),
      averageTaskCompletionTime: members.reduce((acc, member) => acc + (member.performanceMetrics?.averageTaskCompletionTime || 0), 0) / members.length,
      onTimeDeliveryRate: members.reduce((acc, member) => acc + (member.performanceMetrics?.onTimeDeliveryRate || 0), 0) / members.length,
      qualityScore: members.reduce((acc, member) => acc + (member.performanceMetrics?.qualityScore || 0), 0) / members.length,
      collaborationScore: members.reduce((acc, member) => acc + (member.performanceMetrics?.collaborationScore || 0), 0) / members.length,
      skillDistribution: calculateSkillDistribution(members),
    };
    setTeamStats(stats);
  };

  const calculateSkillDistribution = (members: TeamMember[]) => {
    const skillMap = new Map<string, number>();
    members.forEach(member => {
      member.skills.forEach(skill => {
        skillMap.set(skill, (skillMap.get(skill) || 0) + 1);
      });
    });

    return Array.from(skillMap.entries()).map(([skill, count]) => ({
      skill,
      count,
      percentage: (count / members.length) * 100,
    }));
  };

  const handleAddMember = async () => {
    if (!newMember.name || !newMember.role || !newMember.email) return;

    const member: TeamMember = {
      id: Date.now().toString(),
      ...newMember,
      avatar: `https://ui-avatars.com/api/?name=${newMember.name.replace(' ', '+')}&background=random`,
      tasksCompleted: 0,
      tasksPending: 0,
      productivity: 0,
      joinDate: new Date().toISOString(),
      skills: newMember.skills.split(',').map(skill => skill.trim()),
      notifications: true,
      performanceMetrics: {
        averageTaskCompletionTime: 0,
        onTimeDeliveryRate: 0,
        qualityScore: 0,
        collaborationScore: 0,
        lastEvaluationDate: new Date().toISOString(),
        skillImprovements: [],
      },
    };

    const updatedMembers = [...teamMembers, member];
    setTeamMembers(updatedMembers);
    updateTeamStats(updatedMembers);
    setNewMember({ name: '', role: '', email: '', phone: '', skills: '' });
    setShowAddMember(false);

    // Send welcome notification
    const notificationService = NotificationService.getInstance();
    await notificationService.sendNotification({
      type: 'team_update',
      recipient: member,
      subject: 'Welcome to the Team!',
      message: `Welcome ${member.name}! We're excited to have you on board.`,
    });
  };

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member);
    setNewMember({
      name: member.name,
      role: member.role,
      email: member.email,
      phone: member.phone,
      skills: member.skills.join(', '),
    });
    setShowAddMember(true);
  };

  const handleDeleteMember = async (memberId: string) => {
    const updatedMembers = teamMembers.filter(member => member.id !== memberId);
    setTeamMembers(updatedMembers);
    updateTeamStats(updatedMembers);

    // Send notification to other team members
    const notificationService = NotificationService.getInstance();
    const removedMember = teamMembers.find(m => m.id === memberId);
    if (removedMember) {
      await notificationService.sendNotification({
        type: 'team_update',
        recipient: removedMember,
        subject: 'Team Member Removed',
        message: `You have been removed from the team.`,
      });
    }
  };

  const handleNotificationToggle = async (memberId: string) => {
    const updatedMembers = teamMembers.map(member =>
      member.id === memberId
        ? { ...member, notifications: !member.notifications }
        : member
    );
    setTeamMembers(updatedMembers);

    const member = updatedMembers.find(m => m.id === memberId);
    if (member) {
      const notificationService = NotificationService.getInstance();
      await notificationService.sendNotification({
        type: 'team_update',
        recipient: member,
        subject: 'Notification Preferences Updated',
        message: `Your notification preferences have been ${member.notifications ? 'enabled' : 'disabled'}.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <UserGroupIcon className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold">Team Dashboard</h1>
          </div>
          <button
            onClick={() => {
              setEditingMember(null);
              setNewMember({ name: '', role: '', email: '', phone: '', skills: '' });
              setShowAddMember(true);
            }}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <UserPlusIcon className="w-5 h-5" />
            <span>Add Member</span>
          </button>
        </div>

        {/* Add/Edit Member Modal */}
        {showAddMember && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
                </h2>
                <button
                  onClick={() => {
                    setShowAddMember(false);
                    setEditingMember(null);
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={newMember.phone}
                  onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Skills (comma-separated)"
                  value={newMember.skills}
                  onChange={(e) => setNewMember({ ...newMember, skills: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => {
                      setShowAddMember(false);
                      setEditingMember(null);
                    }}
                    className="px-4 py-2 text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddMember}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {editingMember ? 'Save Changes' : 'Add Member'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Team Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-400 text-sm mb-2">Total Members</h3>
                <p className="text-3xl font-bold">{teamStats.totalMembers}</p>
              </div>
              <UserGroupIcon className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-400 text-sm mb-2">Total Tasks</h3>
                <p className="text-3xl font-bold">{teamStats.totalTasks}</p>
              </div>
              <ChartBarIcon className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-400 text-sm mb-2">Completed Tasks</h3>
                <p className="text-3xl font-bold text-green-500">{teamStats.completedTasks}</p>
              </div>
              <CalendarIcon className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-400 text-sm mb-2">Team Productivity</h3>
                <p className="text-3xl font-bold text-blue-500">{teamStats.teamProductivity}%</p>
              </div>
              <ChartBarIcon className="w-8 h-8 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Enhanced Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-gray-400 text-sm mb-2">Average Task Completion Time</h3>
            <p className="text-3xl font-bold text-blue-500">{teamStats.averageTaskCompletionTime.toFixed(1)} days</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-gray-400 text-sm mb-2">On-Time Delivery Rate</h3>
            <p className="text-3xl font-bold text-green-500">{teamStats.onTimeDeliveryRate.toFixed(1)}%</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-gray-400 text-sm mb-2">Quality Score</h3>
            <p className="text-3xl font-bold text-yellow-500">{teamStats.qualityScore.toFixed(1)}%</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-gray-400 text-sm mb-2">Collaboration Score</h3>
            <p className="text-3xl font-bold text-purple-500">{teamStats.collaborationScore.toFixed(1)}%</p>
          </div>
        </div>

        {/* Team Members */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Team Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-gray-700 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{member.name}</h3>
                      <p className="text-gray-400">{member.role}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditMember(member)}
                      className="p-2 text-gray-400 hover:text-white"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteMember(member.id)}
                      className="p-2 text-gray-400 hover:text-red-500"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <EnvelopeIcon className="w-4 h-4" />
                    <span>{member.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <PhoneIcon className="w-4 h-4" />
                    <span>{member.phone}</span>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-gray-400 mb-1">
                      <span>Tasks Completed</span>
                      <span>{member.tasksCompleted}</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(member.tasksCompleted / (member.tasksCompleted + member.tasksPending)) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-gray-400 mb-1">
                      <span>Productivity</span>
                      <span>{member.productivity}%</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${member.productivity}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    Joined: {new Date(member.joinDate).toLocaleDateString()}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-600 text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <button className="flex items-center space-x-1 text-blue-500 hover:text-blue-400">
                      <ChatBubbleLeftRightIcon className="w-4 h-4" />
                      <span>Message</span>
                    </button>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={member.notifications}
                        onChange={() => handleNotificationToggle(member.id)}
                        className="form-checkbox h-4 w-4 text-blue-500"
                      />
                      <span className="text-sm text-gray-400">Email Notifications</span>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Distribution */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Team Skills Distribution</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamStats.skillDistribution.map((skill) => (
              <div key={skill.skill} className="bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">{skill.skill}</h3>
                  <span className="text-sm text-gray-400">{skill.count} members</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${skill.percentage}%` }}
                  />
                </div>
                <p className="text-sm text-gray-400 mt-1">{skill.percentage.toFixed(1)}% of team</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team; 