import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Target, ArrowRight, ArrowLeft, Clock, CheckCircle, Code, Network, Shield } from "lucide-react";

const Technical = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeSpent, setTimeSpent] = useState(0);

  const sections = [
    {
      title: "General Aptitude",
      icon: Target,
      description: "Logical reasoning and basic mathematical skills",
      questions: [
        {
          id: "aptitude_1",
          text: "If a system logs 1,000 events per hour, how many events will it log in 2.5 hours?",
          options: [
            { value: "1500", label: "1,500 events" },
            { value: "2000", label: "2,000 events" },
            { value: "2500", label: "2,500 events" },
            { value: "3000", label: "3,000 events" }
          ],
          correct: "2500"
        },
        {
          id: "aptitude_2",
          text: "In a network with 256 IP addresses, what percentage does 64 addresses represent?",
          options: [
            { value: "20", label: "20%" },
            { value: "25", label: "25%" },
            { value: "30", label: "30%" },
            { value: "35", label: "35%" }
          ],
          correct: "25"
        },
        {
          id: "aptitude_3",
          text: "If Pattern: A→1, B→2, C→3, then what follows: X→?, Y→?, Z→?",
          options: [
            { value: "22,23,24", label: "X→22, Y→23, Z→24" },
            { value: "24,25,26", label: "X→24, Y→25, Z→26" },
            { value: "23,24,25", label: "X→23, Y→24, Z→25" },
            { value: "25,26,27", label: "X→25, Y→26, Z→27" }
          ],
          correct: "24,25,26"
        }
      ]
    },
    {
      title: "Prerequisite Knowledge",
      icon: Code,
      description: "Operating systems, networking, and programming fundamentals",
      questions: [
        {
          id: "prereq_1",
          text: "What does 'localhost' typically refer to in networking?",
          options: [
            { value: "remote", label: "A remote server" },
            { value: "local", label: "The local machine/computer" },
            { value: "router", label: "The network router" },
            { value: "gateway", label: "The default gateway" }
          ],
          correct: "local"
        },
        {
          id: "prereq_2",
          text: "Which programming language is most commonly used in ethical hacking?",
          options: [
            { value: "java", label: "Java" },
            { value: "python", label: "Python" },
            { value: "csharp", label: "C#" },
            { value: "javascript", label: "JavaScript" }
          ],
          correct: "python"
        },
        {
          id: "prereq_3",
          text: "What is the purpose of a firewall in network security?",
          options: [
            { value: "speed", label: "To increase network speed" },
            { value: "storage", label: "To provide data storage" },
            { value: "filter", label: "To filter and control network traffic" },
            { value: "backup", label: "To backup system data" }
          ],
          correct: "filter"
        },
        {
          id: "prereq_4",
          text: "What does DNS stand for in networking?",
          options: [
            { value: "data", label: "Data Network System" },
            { value: "domain", label: "Domain Name System" },
            { value: "dynamic", label: "Dynamic Network Service" },
            { value: "digital", label: "Digital Network Security" }
          ],
          correct: "domain"
        }
      ]
    },
    {
      title: "Domain-Specific Knowledge",
      icon: Shield,
      description: "Security concepts, ethics, and cybersecurity fundamentals",
      questions: [
        {
          id: "domain_1",
          text: "What is the primary difference between ethical hacking and malicious hacking?",
          options: [
            { value: "tools", label: "The tools used are different" },
            { value: "permission", label: "Ethical hacking has explicit permission" },
            { value: "complexity", label: "Ethical hacking is more complex" },
            { value: "speed", label: "Ethical hacking is faster" }
          ],
          correct: "permission"
        },
        {
          id: "domain_2",
          text: "What does 'OWASP' refer to in cybersecurity?",
          options: [
            { value: "protocol", label: "A network communication protocol" },
            { value: "organization", label: "An open source security project/organization" },
            { value: "software", label: "A specific hacking software" },
            { value: "certification", label: "A professional certification" }
          ],
          correct: "organization"
        },
        {
          id: "domain_3",
          text: "What is a 'vulnerability' in cybersecurity terms?",
          options: [
            { value: "virus", label: "A type of computer virus" },
            { value: "weakness", label: "A weakness that can be exploited" },
            { value: "password", label: "A weak password" },
            { value: "user", label: "An untrained user" }
          ],
          correct: "weakness"
        },
        {
          id: "domain_4",
          text: "Which is a key principle of ethical hacking?",
          options: [
            { value: "stealth", label: "Remain undetected at all costs" },
            { value: "damage", label: "Cause minimal system damage" },
            { value: "documentation", label: "Document and report findings" },
            { value: "speed", label: "Complete assessments quickly" }
          ],
          correct: "documentation"
        }
      ]
    }
  ];

  const currentQuestions = sections[currentSection]?.questions || [];
  const totalQuestions = sections.reduce((sum, section) => sum + section.questions.length, 0);
  const answeredQuestions = Object.keys(answers).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const canContinue = () => {
    return currentQuestions.every(q => answers[q.id]);
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      navigate('/wiscar');
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    } else {
      navigate('/psychometric');
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
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
              <Target className="h-8 w-8 text-primary cyber-glow" />
              <div>
                <h1 className="text-xl font-bold">Technical & Aptitude Assessment</h1>
                <p className="text-sm text-muted-foreground">{sections[currentSection]?.title}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">
                <Clock className="h-4 w-4 mr-2" />
                {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
              </Badge>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {answeredQuestions}/{totalQuestions}
                </span>
                <Progress value={progress} className="w-32" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Section Header */}
        <Card className="question-card mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center justify-between">
              <div className="flex items-center">
                {(() => {
                  const Icon = sections[currentSection].icon;
                  return <Icon className="h-8 w-8 text-primary mr-3 cyber-glow" />;
                })()}
                {sections[currentSection]?.title}
              </div>
              <Badge variant="outline">
                Section {currentSection + 1} of {sections.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-lg">{sections[currentSection]?.description}</p>
            <div className="mt-4 p-4 bg-warning/10 border border-warning/20 rounded-lg">
              <p className="text-sm">
                ⏱️ <strong>Time-bound questions:</strong> Take your time to think through each answer carefully. 
                This section evaluates your technical readiness and foundational knowledge.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Questions */}
        <div className="space-y-8 mb-8">
          {currentQuestions.map((question, index) => (
            <Card key={question.id} className="question-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-start">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary/10 text-primary rounded-full mr-4 mt-1 flex-shrink-0">
                    {answers[question.id] ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <span className="text-sm font-bold">{index + 1}</span>
                    )}
                  </div>
                  <span className="leading-relaxed">{question.text}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pl-16">
                <RadioGroup
                  value={answers[question.id] || ""}
                  onValueChange={(value) => handleAnswerChange(question.id, value)}
                >
                  <div className="space-y-3">
                    {question.options.map((option) => (
                      <div key={option.value} className="option-card p-3 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value={option.value} id={`${question.id}_${option.value}`} />
                          <Label 
                            htmlFor={`${question.id}_${option.value}`}
                            className="cursor-pointer text-sm leading-relaxed flex-1"
                          >
                            {option.label}
                          </Label>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Section Progress */}
        <Card className="question-card mb-8 bg-primary/5 border-primary/20">
          <CardContent className="py-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold">Section Progress</span>
              <span className="text-sm text-muted-foreground">
                {currentQuestions.filter(q => answers[q.id]).length}/{currentQuestions.length} completed
              </span>
            </div>
            <Progress 
              value={(currentQuestions.filter(q => answers[q.id]).length / currentQuestions.length) * 100} 
              className="h-3"
            />
          </CardContent>
        </Card>

        {/* Technical Knowledge Hint */}
        <Card className="question-card mb-8 bg-accent/5 border-accent/20">
          <CardContent className="py-6">
            <div className="flex items-start space-x-4">
              <Target className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Technical Assessment Overview</h3>
                <p className="text-sm text-muted-foreground">
                  This section evaluates your foundational knowledge in areas critical to ethical hacking: 
                  logical reasoning, networking concepts, programming fundamentals, and security principles. 
                  Don't worry if you don't know all the answers - this helps us understand your starting point.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={handlePrevious}>
            <ArrowLeft className="mr-2 h-5 w-5" />
            {currentSection === 0 ? 'Back to Psychometric' : 'Previous Section'}
          </Button>
          
          <div className="flex items-center space-x-4">
            {!canContinue() && (
              <span className="text-sm text-muted-foreground">
                Please answer all questions to continue
              </span>
            )}
            <Button 
              size="lg" 
              className="cyber-glow"
              onClick={handleNext}
              disabled={!canContinue()}
            >
              {currentSection === sections.length - 1 ? 'Continue to WISCAR Analysis' : 'Next Section'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Technical;