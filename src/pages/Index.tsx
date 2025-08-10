import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, Brain, Target, Zap, Users, CheckCircle, Clock, Award } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    {
      title: "Test Introduction",
      description: "Learn about ethical hacking and assessment overview",
      icon: Shield,
      duration: "3 min",
      status: "ready"
    },
    {
      title: "Psychometric Assessment",
      description: "Personality, interests, and cognitive style evaluation",
      icon: Brain,
      duration: "8 min",
      status: "locked"
    },
    {
      title: "Technical & Aptitude",
      description: "Evaluate technical readiness and foundational knowledge",
      icon: Target,
      duration: "12 min",
      status: "locked"
    },
    {
      title: "WISCAR Analysis",
      description: "Holistic fit assessment using advanced framework",
      icon: Zap,
      duration: "8 min",
      status: "locked"
    },
    {
      title: "Results & Recommendations",
      description: "Personalized career guidance and learning path",
      icon: Award,
      duration: "5 min",
      status: "locked"
    }
  ];

  const careerPaths = [
    "Penetration Tester",
    "Cybersecurity Analyst", 
    "Security Consultant",
    "Vulnerability Assessor",
    "Red Team Member"
  ];

  const successTraits = [
    "High attention to detail",
    "Problem-solving mindset", 
    "Persistence and curiosity",
    "Integrity and ethical responsibility",
    "Strong analytical thinking"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5"></div>
        <div className="container mx-auto px-4 py-16 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Shield className="h-16 w-16 text-primary cyber-glow mr-4" />
              <div className="text-left">
                <h1 className="text-5xl font-bold mb-2">
                  <span className="gradient-text">Should I Learn</span>
                </h1>
                <h1 className="text-5xl font-bold gradient-text">Ethical Hacking?</h1>
              </div>
            </div>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              An AI-Powered Learning & Career Fit Assessment that evaluates your readiness, 
              personality fit, and technical aptitude for cybersecurity careers.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <Badge variant="secondary" className="px-4 py-2">
                <Clock className="h-4 w-4 mr-2" />
                25-30 minutes
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Users className="h-4 w-4 mr-2" />
                Psychometrically Valid
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Target className="h-4 w-4 mr-2" />
                Personalized Results
              </Badge>
            </div>
            <Button 
              size="lg" 
              className="cyber-glow px-8 py-6 text-lg"
              onClick={() => navigate('/introduction')}
            >
              Start Assessment
              <Shield className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Assessment Overview */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Assessment Overview</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive assessment evaluates multiple dimensions to determine your fit for ethical hacking careers.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-6 mb-12">
          {sections.map((section, index) => {
            const Icon = section.icon;
            const isActive = index === currentSection;
            const isCompleted = index < currentSection;
            
            return (
              <Card key={index} className={`relative transition-all duration-300 ${
                isActive ? 'ring-2 ring-primary cyber-glow' : ''
              } ${section.status === 'locked' ? 'opacity-60' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`h-6 w-6 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                    {isCompleted && <CheckCircle className="h-5 w-5 text-primary" />}
                  </div>
                  <CardTitle className="text-sm font-medium">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-xs mb-3">{section.description}</CardDescription>
                  <Badge variant={isActive ? "default" : "secondary"} className="text-xs">
                    {section.duration}
                  </Badge>
                </CardContent>
                {index < sections.length - 1 && (
                  <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-px bg-border hidden md:block"></div>
                )}
              </Card>
            );
          })}
        </div>

        <div className="mb-8">
          <Progress value={(currentSection / (sections.length - 1)) * 100} className="h-2" />
        </div>
      </div>

      {/* What is Ethical Hacking */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">What is Ethical Hacking?</h2>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
              Ethical Hacking involves legally breaking into systems to identify and fix security vulnerabilities. 
              It's used in cybersecurity, penetration testing, network defense, and compliance auditing.
            </p>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">Typical Career Paths:</h3>
              <div className="grid grid-cols-1 gap-3">
                {careerPaths.map((career, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{career}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <Card className="question-card p-8">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center">
                <Brain className="h-6 w-6 text-primary mr-3" />
                Traits of People Who Succeed
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {successTraits.map((trait, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">{trait}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 py-16">
        <Card className="question-card text-center p-12">
          <CardContent>
            <h2 className="text-3xl font-bold mb-4">Ready to Discover Your Path?</h2>
            <p className="text-muted-foreground mb-8 text-lg max-w-2xl mx-auto">
              Take our comprehensive assessment to determine if ethical hacking aligns with your 
              interests, skills, and career goals.
            </p>
            <Button 
              size="lg" 
              className="cyber-glow px-8 py-6 text-lg"
              onClick={() => navigate('/introduction')}
            >
              Begin Assessment Journey
              <Zap className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;