import { MessageCircle, Brain, Youtube } from "lucide-react";

const steps = [
  {
    number: "1",
    icon: Youtube,
    title: "Paste YouTube URL",
    desc: "Enter any YouTube video URL in the search box above"
  },
  {
    number: "2",
    icon: Brain,
    title: "Process Video",
    desc: "YouTutor analyzes the transcript and prepares an interactive lesson"
  },
  {
    number: "3",
    icon: MessageCircle,
    title: "Start Chatting",
    desc: "Ask questions and interact with the video content"
  }
];

const HowItWorks = () => (
  <section id="how-it-works" className="w-full max-w-6xl mx-auto">
    <h2 className="text-4xl md:text-5xl font-bold text-deepNavy text-center mb-16">
      How It Works
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {steps.map((step, i) => {
        const Icon = step.icon;
        return (
          <div
            key={i}
            className="relative bg-white rounded-2xl p-8 text-center border border-gray/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            {/* Number Badge */}
            <div
              className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-md"
              style={{ backgroundColor: "#BDF0E6" }}
            >
              <span className="text-lg font-bold text-deepNavy">
                {step.number}
              </span>
            </div>

            {/* Icon */}
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 mt-4 shadow-md"
              style={{ backgroundColor: "#BDF0E6" }}
            >
              <Icon className="w-8 h-8" style={{ color: "#151936" }} />
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-deepNavy mb-3">
              {step.title}
            </h3>
            <p className="text-gray leading-relaxed">{step.desc}</p>
          </div>
        );
      })}
    </div>
  </section>
);

export default HowItWorks;
