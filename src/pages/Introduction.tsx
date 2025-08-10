import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, Brain, Target, Zap, Award, ArrowRight, Clock, Users, CheckCircle } from "lucide-react";

const Introduction = () => {
  const navigate = useNavigate();
  const [readTime, setReadTime] = useState(0);

  const assessmentSections = [
    {
      title: "Psychometric Section",
      icon: Brain,
      duration: "8 minutes",
      description: "Assess personality, interests, motivation, and cognitive style",
      subsections: [
        "Interest Scale - curiosity about technology and problem-solving",
        "Personality Compatibility - Big Five traits analysis", 
        "Cognitive Style & Working Preferences",
        "Motivation Scale - based on Grit and Growth Mindset"
      ]
    },
    {
      title: "Technical & Aptitude Section", 
      icon: Target,
      duration: "12 minutes",
      description: "Evaluate current aptitude and foundational knowledge",
      subsections: [
        "General Aptitude - logical reasoning and basic math",
        "Prerequisite Knowledge - OS, networks, programming logic",
        "Domain-Specific Quiz - security concepts and ethics"
      ]
    },
    {
      title: "WISCAR Framework Analysis",
      icon: Zap, 
      duration: "8 minutes",
      description: "Holistic fit assessment using advanced framework",
      subsections: [
        "Will - motivation and persistence evaluation",
        "Interest - genuine passion assessment",
        "Skill - current technical capabilities",
        "Cognitive Readiness - learning capacity analysis",
        "Ability to Learn - adaptability and growth potential",
        "Real-World Alignment - career goals matching"
      ]
    }
  ];

  const expectedOutcomes = [
    {
      title: "Pursue Recommendation",
      description: "Clear Yes/No/Maybe guidance with confidence score",
      icon: CheckCircle
    },
    {
      title: "Personalized Roadmap", 
      description: "Step-by-step learning path from beginner to job-ready",
      icon: Target
    },
    {
      title: "Career Guidance",
      description: "Top 5 career roles and skill gap analysis",
      icon: Users
    },
    {
      title: "Alternative Paths",
      description: "Related career suggestions if ethical hacking isn't a fit",
      icon: ArrowRight
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setReadTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-primary cyber-glow" />
              <div>
                <h1 className="text-xl font-bold">Ethical Hacking Assessment</h1>
                <p className="text-sm text-muted-foreground">Test Introduction</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">
                <Clock className="h-4 w-4 mr-2" />
                Reading: {Math.floor(readTime / 60)}:{(readTime % 60).toString().padStart(2, '0')}
              </Badge>
              <Progress value={20} className="w-32" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Main Introduction */}
        <Card className="question-card mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Shield className="h-8 w-8 text-primary mr-3 cyber-glow" />
              Purpose of the Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-lg leading-relaxed">
            <p>
              This assessment helps students and professionals determine whether <strong>Ethical Hacking</strong> aligns 
              with their interests, skills, personality, aptitude, and career goals. It evaluates technical readiness, 
              psychometric compatibility, learning potential, and recommends actionable next steps.
            </p>
            
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-primary">What is Ethical Hacking?</h3>
              <p className="text-muted-foreground">
                Ethical Hacking involves legally breaking into systems to identify and fix security vulnerabilities. 
                It's used in cybersecurity, penetration testing, network defense, and compliance auditing.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Assessment Sections */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Assessment Structure</h2>
          <div className="space-y-6">
            {assessmentSections.map((section, index) => {
              const Icon = section.icon;
              return (
                <Card key={index} className="question-card">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Icon className="h-6 w-6 text-primary mr-3" />
                        {section.title}
                      </div>
                      <Badge variant="outline">{section.duration}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{section.description}</p>
                    <div className="space-y-2">
                      {section.subsections.map((subsection, subIndex) => (
                        <div key={subIndex} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-muted-foreground">{subsection}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Expected Outcomes */}
        <Card className="question-card mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">What You'll Receive</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {expectedOutcomes.map((outcome, index) => {
                const Icon = outcome.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <Icon className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">{outcome.title}</h3>
                      <p className="text-sm text-muted-foreground">{outcome.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Success Traits Reminder */}
        <Card className="question-card mb-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="h-6 w-6 text-primary mr-3" />
              Traits of People Who Succeed in Ethical Hacking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "High attention to detail",
                "Problem-solving mindset", 
                "Persistence and curiosity",
                "Integrity and ethical responsibility",
                "Strong analytical thinking"
              ].map((trait, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{trait}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => navigate('/')}>
            Back to Overview
          </Button>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">Ready to begin?</span>
            <Button 
              size="lg" 
              className="cyber-glow"
              onClick={() => navigate('/psychometric')}
            >
              Start Psychometric Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;