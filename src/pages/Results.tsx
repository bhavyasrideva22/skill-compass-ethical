import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Award, Target, Users, TrendingUp, CheckCircle, AlertTriangle, ArrowRight, Download, RefreshCw, Shield, Brain, Code, Network } from "lucide-react";

const Results = () => {
  const navigate = useNavigate();
  
  // Mock results - in real implementation, this would come from assessment data
  const [results] = useState({
    overallRecommendation: "YES",
    confidenceScore: 82,
    psychometricScore: 85,
    technicalScore: 78,
    wiscarScore: 84,
    topStrengths: [
      "Strong analytical thinking and problem-solving skills",
      "High motivation and persistence (Grit score: 89)",
      "Excellent ethical awareness and responsibility",
      "Good foundational technical knowledge"
    ],
    areasForImprovement: [
      "Networking fundamentals need strengthening",
      "Programming skills require development",
      "Practical security tools experience needed"
    ],
    careerRoles: [
      {
        title: "Penetration Tester",
        match: 88,
        description: "Simulate attacks to find vulnerabilities",
        skillGaps: ["Advanced exploitation techniques", "Report writing"]
      },
      {
        title: "Security Analyst",
        match: 82,
        description: "Monitor and respond to security threats",
        skillGaps: ["SIEM tools", "Incident response procedures"]
      },
      {
        title: "Vulnerability Assessor",
        match: 85,
        description: "Identify and assess system weaknesses",
        skillGaps: ["Automated scanning tools", "Risk assessment"]
      },
      {
        title: "Security Consultant",
        match: 75,
        description: "Provide security guidance to organizations",
        skillGaps: ["Business communication", "Compliance frameworks"]
      },
      {
        title: "Red Team Member",
        match: 80,
        description: "Advanced adversarial simulation expert",
        skillGaps: ["Social engineering", "Advanced persistence"]
      }
    ]
  });

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-primary";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getRecommendationStyle = (recommendation: string) => {
    switch (recommendation) {
      case "YES":
        return "bg-primary/10 border-primary/20 text-primary";
      case "MAYBE":
        return "bg-warning/10 border-warning/20 text-warning";
      case "NO":
        return "bg-destructive/10 border-destructive/20 text-destructive";
      default:
        return "bg-muted/10 border-muted/20";
    }
  };

  const learningPath = {
    beginner: [
      "Networking Fundamentals (CompTIA Network+)",
      "Operating Systems Essentials (Linux, Windows)",
      "Python Programming for Security",
      "Basic Cryptography Concepts"
    ],
    intermediate: [
      "Kali Linux Mastery",
      "Web Application Security (OWASP Top 10)",
      "Network Penetration Testing",
      "Vulnerability Assessment Tools"
    ],
    advanced: [
      "Metasploit Framework",
      "Exploit Development Basics",
      "Red Team Tactics and Techniques",
      "Advanced Persistent Threats (APT)"
    ],
    jobReady: [
      "Industry Certifications (CEH, OSCP, CISSP)",
      "Real-world Lab Environments",
      "Bug Bounty Participation",
      "Professional Portfolio Development"
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Award className="h-8 w-8 text-primary cyber-glow" />
              <div>
                <h1 className="text-2xl font-bold">Assessment Results</h1>
                <p className="text-muted-foreground">Your personalized ethical hacking readiness report</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate('/')}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Retake Assessment
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Overall Recommendation */}
        <Card className={`question-card mb-8 ${getRecommendationStyle(results.overallRecommendation)}`}>
          <CardHeader>
            <CardTitle className="text-3xl flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="h-10 w-10 mr-4 cyber-glow" />
                <div>
                  <div>Should You Learn Ethical Hacking?</div>
                  <div className="text-4xl font-bold mt-2">{results.overallRecommendation}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm opacity-80">Confidence Score</div>
                <div className="text-3xl font-bold">{results.confidenceScore}%</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed mb-6">
              Based on your assessment results, we <strong>recommend pursuing ethical hacking</strong>. 
              You demonstrate strong foundational traits, good technical aptitude, and excellent motivation 
              for this career path. With focused learning and practice, you have great potential to succeed.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className={`text-2xl font-bold ${getScoreColor(results.psychometricScore)}`}>
                  {results.psychometricScore}%
                </div>
                <div className="text-sm opacity-80">Psychological Fit</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${getScoreColor(results.technicalScore)}`}>
                  {results.technicalScore}%
                </div>
                <div className="text-sm opacity-80">Technical Readiness</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${getScoreColor(results.wiscarScore)}`}>
                  {results.wiscarScore}%
                </div>
                <div className="text-sm opacity-80">WISCAR Score</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Strengths */}
          <Card className="question-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-6 w-6 text-primary mr-3" />
                Your Key Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results.topStrengths.map((strength, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm leading-relaxed">{strength}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Areas for Improvement */}
          <Card className="question-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-6 w-6 text-warning mr-3" />
                Areas for Development
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results.areasForImprovement.map((area, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <AlertTriangle className="h-4 w-4 text-warning mt-1 flex-shrink-0" />
                    <span className="text-sm leading-relaxed">{area}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Career Roles */}
        <Card className="question-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-6 w-6 text-primary mr-3" />
              Top 5 Career Roles for You
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {results.careerRoles.map((role, index) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold">{role.title}</h3>
                    <Badge variant="outline" className={getScoreColor(role.match)}>
                      {role.match}% Match
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-3">{role.description}</p>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Skill Gaps to Address:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {role.skillGaps.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Progress value={role.match} className="mt-3 h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Learning Path */}
        <Card className="question-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-6 w-6 text-primary mr-3" />
              Your Personalized Learning Path
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <div className="flex items-center mb-4">
                  <Network className="h-5 w-5 text-primary mr-2" />
                  <h3 className="font-semibold">Beginner</h3>
                </div>
                <div className="space-y-2">
                  {learningPath.beginner.map((item, index) => (
                    <div key={index} className="text-sm text-muted-foreground leading-relaxed">
                      • {item}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="flex items-center mb-4">
                  <Code className="h-5 w-5 text-primary mr-2" />
                  <h3 className="font-semibold">Intermediate</h3>
                </div>
                <div className="space-y-2">
                  {learningPath.intermediate.map((item, index) => (
                    <div key={index} className="text-sm text-muted-foreground leading-relaxed">
                      • {item}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="flex items-center mb-4">
                  <Shield className="h-5 w-5 text-primary mr-2" />
                  <h3 className="font-semibold">Advanced</h3>
                </div>
                <div className="space-y-2">
                  {learningPath.advanced.map((item, index) => (
                    <div key={index} className="text-sm text-muted-foreground leading-relaxed">
                      • {item}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="flex items-center mb-4">
                  <Award className="h-5 w-5 text-primary mr-2" />
                  <h3 className="font-semibold">Job-Ready</h3>
                </div>
                <div className="space-y-2">
                  {learningPath.jobReady.map((item, index) => (
                    <div key={index} className="text-sm text-muted-foreground leading-relaxed">
                      • {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="question-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ArrowRight className="h-6 w-6 text-primary mr-3" />
              Recommended Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Immediate Actions (Next 30 Days)</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>• Start with Python programming fundamentals</div>
                  <div>• Set up a virtual lab environment</div>
                  <div>• Join cybersecurity communities and forums</div>
                  <div>• Begin CompTIA Network+ study materials</div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Long-term Goals (6-12 Months)</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>• Complete foundational certifications</div>
                  <div>• Build a portfolio of security projects</div>
                  <div>• Participate in Capture The Flag (CTF) events</div>
                  <div>• Consider entry-level security positions</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Final CTA */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            You have the foundation to succeed in ethical hacking. Take the first step today and begin 
            building the skills that will launch your cybersecurity career.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" className="cyber-glow">
              Start Learning Path
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/')}>
              Take Assessment Again
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;