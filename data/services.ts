
import { Service } from '../types';
import { Briefcase, Cloud, Shield, Code } from 'lucide-react';

export const servicesData: Service[] = [
  {
    id: 'corporate-training',
    title: 'Corporate IT Training',
    description: 'Customized training programs for your team to upskill in the latest technologies. We cover everything from web development to cloud computing and cybersecurity.',
    icon: Briefcase,
  },
  {
    id: 'cloud-consulting',
    title: 'Cloud Solutions Consulting',
    description: 'Expert guidance on cloud strategy, migration, and management. We help you leverage the power of AWS, Azure, and Google Cloud to optimize your infrastructure.',
    icon: Cloud,
  },
  {
    id: 'cybersecurity-services',
    title: 'Cybersecurity Assessment',
    description: 'Protect your digital assets with our comprehensive security services, including vulnerability assessments, penetration testing, and incident response planning.',
    icon: Shield,
  },
  {
    id: 'software-development',
    title: 'Custom Software Development',
    description: 'We build tailored software solutions to meet your unique business needs, from web applications to mobile apps, ensuring scalability and performance.',
    icon: Code,
  },
];
