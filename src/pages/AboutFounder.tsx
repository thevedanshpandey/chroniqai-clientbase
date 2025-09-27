import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function AboutFounder() {
  const achievements = [
    "Founder of ChroniqAI – AI solutions agency",
    "Invited to IIT Bombay AI Meetup (2025)",
    "Worked as content writer for India's biggest sports portal",
    "Achieved 300M+ organic traffic on EV blog project",
    "District-level elocution winner and Head Boy",
    "Built Jio Gramin platform (100,000 GB free internet distributed)",
    "Developed Hindu VPN app on Amazon"
  ];

  const quickFacts = [
    { label: "Full Name", value: "Vedansh Pandey" },
    { label: "Age", value: "17 (as of 2025)" },
    { label: "Profession", value: "AI Entrepreneur, Content Writer, Digital Marketer" },
    { label: "Education", value: "B.Sc. in Computer Science (Mithibai College, Mumbai)" },
    { label: "Company", value: "Founder of ChroniqAI" },
    { label: "Known For", value: "AI Automations, Content Writing, SEO" },
    { label: "Nationality", value: "Indian" }
  ];

  const faqs = [
    {
      question: "Who is Vedansh Pandey?",
      answer: "Vedansh Pandey is a 17-year-old AI entrepreneur from India, founder of ChroniqAI, and a content writer known for his expertise in SEO and digital marketing."
    },
    {
      question: "What is ChroniqAI?",
      answer: "ChroniqAI is an AI agency founded by Vedansh Pandey in 2025 that builds AI-powered systems to help businesses automate tasks, save time, and increase revenue."
    },
    {
      question: "What is the age of Vedansh Pandey in 2025?",
      answer: "Vedansh Pandey is 17 years old in 2025."
    },
    {
      question: "What are the achievements of Vedansh Pandey?",
      answer: "He achieved 300M+ traffic on an EV niche blog, was invited to IIT Bombay AI Meetup, founded ChroniqAI, and built multiple digital platforms."
    },
    {
      question: "What is the net worth of Vedansh Pandey?",
      answer: "While his exact net worth is not disclosed, he has unlocked consistent 3-figure monthly earnings through his AI startup and digital ventures."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Vedansh Pandey Biography – AI Expert & Entrepreneur from India</title>
        <meta 
          name="description" 
          content="Discover the inspiring journey of Vedansh Pandey, a 17-year-old AI entrepreneur from India, founder of ChroniqAI, and tech innovator in digital marketing." 
        />
        <meta name="keywords" content="Vedansh Pandey, AI entrepreneur, ChroniqAI, digital marketing, startup founder, India, artificial intelligence" />
        <meta name="author" content="Vedansh Pandey" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Vedansh Pandey Biography – AI Expert & Entrepreneur from India" />
        <meta property="og:description" content="Discover the inspiring journey of Vedansh Pandey, a 17-year-old AI entrepreneur from India, founder of ChroniqAI, and tech innovator in digital marketing." />
        <meta property="og:type" content="article" />
        
        {/* Structured data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Vedansh Pandey",
            "jobTitle": "AI Entrepreneur & Founder",
            "worksFor": {
              "@type": "Organization",
              "name": "ChroniqAI"
            },
            "nationality": "Indian",
            "birthDate": "2008",
            "description": "17-year-old AI entrepreneur from India, founder of ChroniqAI, and tech innovator in digital marketing.",
            "knowsAbout": ["Artificial Intelligence", "Digital Marketing", "SEO", "Content Writing", "Web Development"],
            "award": ["District-level elocution winner", "Head Boy of St. Xavier's Inter College"]
          })}
        </script>
      </Helmet>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Vedansh Pandey Biography: AI Expert & Young Entrepreneur from India
          </h1>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">AI Entrepreneur</Badge>
            <Badge variant="secondary">Founder</Badge>
            <Badge variant="secondary">Content Writer</Badge>
            <Badge variant="secondary">Digital Marketer</Badge>
          </div>
        </header>

        <main>
          <section className="mb-8">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Vedansh Pandey is a 17-year-old AI entrepreneur, digital innovator, and founder of ChroniqAI, an AI solutions agency based in India. 
                Known for his determination, resilience, and forward-thinking mindset, Vedansh has become a rising name in the world of Artificial Intelligence, 
                digital marketing, and content creation. From building websites at the age of 14 to launching AI-powered startups and attending prestigious 
                events at IIT Bombay, his journey reflects a true story of persistence and passion.
              </p>
            </Card>
          </section>

          <section className="mb-8">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Early Life & Education</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Vedansh Pandey was born in India and showed an early interest in technology. His journey began in 7th standard, where he started 
                learning image and video editing and launched a YouTube channel that gained 5,000 subscribers. Although the channel was later 
                terminated for publishing hacking tutorials, this setback did not discourage him.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                At just 13 years old, he earned his first ₹35 by commenting on Instagram posts, which gave him the motivation to become financially 
                independent and never ask his parents for funds again.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li><strong>Birthplace:</strong> India</li>
                <li><strong>Date of Birth:</strong> 2008 (17 years old in 2025)</li>
                <li><strong>Current Education:</strong> Pursuing B.Sc. in Computer Science from Mithibai College, Mumbai</li>
                <li><strong>Dream College:</strong> IIT Bombay (invited as AI startup founder in 2025)</li>
              </ul>
            </Card>
          </section>

          <section className="mb-8">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Career Journey</h2>
              
              <h3 className="text-xl font-semibold mb-3 text-foreground">Early Ventures in Tech & Content Writing</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                <li>Started freelancing in 9th standard, building websites but struggled to find clients</li>
                <li>Discovered SEO and content writing in 10th standard</li>
                <li>Worked part-time at India's biggest sports news website, writing 5–8 articles daily, earning ₹10,000 per month</li>
                <li>Despite preparing for exams, he managed his job and achieved good grades</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-foreground">First Startup & Failures</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                <li>Launched his first sports news website VspeakSports, publishing 200+ articles in 3 months</li>
                <li>Later joined an EV niche blog, where his content went viral</li>
                <li>The site attracted 300M+ traffic from Google Discover, generating significant revenue</li>
                <li>Unfortunately, it was hit by Google's March update and failed</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-foreground">Rise as an Entrepreneur</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Worked with India's biggest firms as a professional content writer</li>
                <li>Became Head Boy of his school and won a district-level elocution competition in 11th standard</li>
                <li>Launched his own digital marketing agency, 1stRankQ, during 12th standard</li>
                <li>In 2025, he launched ChroniqAI, his current AI startup, providing automation systems that help businesses save time, boost revenue, and grow 2–5x</li>
              </ul>
            </Card>
          </section>

          <section className="mb-8">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Major Achievements & Recognition</h2>
              <div className="grid gap-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-neon-blue rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">{achievement}</span>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          <section className="mb-8">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Personal Life</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Vedansh Pandey belongs to a supportive family that allowed him to explore his passion. Although his parents never pressured him to pursue science, 
                he chose PCM (Physics, Chemistry, Mathematics) in high school because he believed in choosing the path that challenges him the most.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Currently, Vedansh lives in Mumbai, pursuing his degree while running his AI startup. His lifestyle reflects discipline, self-learning, 
                and resilience rather than luxury.
              </p>
            </Card>
          </section>

          <section className="mb-8">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Net Worth & Income Sources</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Though still a teenager, Vedansh Pandey has built multiple income streams:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                <li>AI Agency (ChroniqAI)</li>
                <li>App & Platform Development (Hindu VPN, Jio Gramin)</li>
                <li>Freelance Content Writing & SEO Projects</li>
                <li>Website Development for Businesses</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                His current net worth is not publicly disclosed, but through his agency and digital projects, he has already unlocked 3-figure monthly earnings in 2025.
              </p>
            </Card>
          </section>

          <section className="mb-8">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Lesser-Known Facts about Vedansh Pandey</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>His first earning was ₹35, made from Instagram commenting</li>
                <li>He bought his first laptop from his content writing income</li>
                <li>He managed to score 90/100 in Physics during one of CBSE's toughest papers</li>
                <li>Despite multiple failures, he never took financial help from his parents</li>
                <li>He started his entrepreneurial journey at the age of 12</li>
              </ul>
            </Card>
          </section>

          <section className="mb-8">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Quick Facts</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {quickFacts.map((fact, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg">
                    <span className="font-medium text-foreground">{fact.label}</span>
                    <span className="text-muted-foreground text-sm">{fact.value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          <section className="mb-8">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Conclusion</h2>
              <p className="text-muted-foreground leading-relaxed">
                The story of Vedansh Pandey proves that success comes to those who refuse to quit. From earning ₹35 on Instagram to being recognized as a young 
                AI entrepreneur in India, his journey is marked by hard work, resilience, and innovation. With ChroniqAI, Vedansh is now helping businesses adopt 
                AI solutions and achieve exponential growth. His journey is just beginning, but his achievements at such a young age make him a role model for 
                aspiring entrepreneurs.
              </p>
            </Card>
          </section>

          <section className="mb-8">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    {index < faqs.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </main>
      </div>
    </>
  );
}