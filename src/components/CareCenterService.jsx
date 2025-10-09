import React from "react";
import { useParams } from "react-router-dom";
import CardComponent from './CardComponent';
import PatientStoryCard from './PatientStoryCard'; // Import PatientStoryCard
import { doctors } from '../pages/FindADoctorPage';


const CareCenterService = () => {
  const { service } = useParams();

  // Helper to extract YouTube video ID
  const getYouTubeVideoId = (url) => {
  if (!url) return null;

  // Handle regular YouTube URLs (watch?v=, youtu.be, etc.)
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return match[2];
  }

  // Handle YouTube Shorts URLs (e.g., youtube.com/shorts/ID)
  const shortsMatch = url.match(/youtube\.com\/shorts\/([^?&#]+)/);
  if (shortsMatch && shortsMatch[1].length === 11) {
    return shortsMatch[1];
  }

  // Handle YouTube Shorts with youtu.be/shorts/ID
  const ytbShortsMatch = url.match(/youtu\.be\/shorts\/([^?&#]+)/);
  if (ytbShortsMatch && ytbShortsMatch[1].length === 11) {
    return ytbShortsMatch[1];
  }

  return null;
};

  // --- NEW: Organized testimonials by service slug ---
  const serviceTestimonialsMap = {
  ent: [
    {
      url: "https://youtu.be/g170O5kK_PA?si=_mumLBPr0JTUV7f_",
      title: "Successful Tonsillectomy Recovery",
      description: "Patient shares smooth recovery after ENT surgery at All Is Well Hospital"
    },
    {
      url: "https://www.youtube.com/shorts/4s1PoTDpmZY",
      title: "Sinus Treatment Success Story",
      description: "How modern ENT procedures relieved chronic sinus issues"
    },
    {
      url: "https://www.youtube.com/shorts/v0_4J4h__3E",
      title: "Improved Hearing Experience",
      description: "Patient shares life-changing hearing improvement journey"
    }
  ],

  pediatrics: [
    {
      url: "https://youtu.be/VvLznqx21xs?si=I-UR7jGlb7u5hFm5",
      title: "Child Wellness Journey",
      description: "Parents express gratitude for expert pediatric care"
    }
  ],

  oncology: [
    {
      url: "https://www.youtube.com/shorts/ijDE0G7K8Zo",
      title: "Cancer Care Journey",
      description: "Emotional testimonial from a patient who beat cancer"
    },
    {
      url: "https://www.youtube.com/shorts/RsJfmpqsYz8",
      title: "Strength During Chemotherapy",
      description: "Patient’s story of hope and resilience during treatment"
    },
    {
      url: "https://www.youtube.com/shorts/ti3QjQ50PhE",
      title: "Comprehensive Oncology Support",
      description: "All-round support from the oncology care team"
    },
    {
      url: "https://www.youtube.com/shorts/Oh4KBkDPc8I",
      title: "Fighting Cancer with Courage",
      description: "Patient discusses her journey through treatment and recovery"
    },
    {
      url: "https://www.youtube.com/shorts/V0ylRPBx_Mg",
      title: "Survivor Story: New Life After Cancer",
      description: "Overcoming cancer with care and compassion"
    },
    {
      url: "https://youtu.be/8VdI0sd_BbE?si=2cejECHAql28OXhi",
      title: "Cancer Survivor’s Motivation",
      description: "Hope-filled recovery story from our oncology department"
    }
  ],

  orthopedic: [
    {
      url: "https://youtu.be/uZgO1ukJULk?si=dpSGtS8aF3YI5kqE",
      title: "Knee Replacement Recovery",
      description: "Patient walks pain-free again after surgery"
    },
    {
      url: "https://youtu.be/GF8b1KDp_rY?si=6v30lQitF-haqasu",
      title: "Hip Surgery Success Story",
      description: "A senior patient regains mobility after expert orthopedic care"
    },
    {
      url: "https://youtu.be/alx2afQSnns?si=FhffFriHDwLbeGCp",
      title: "Back Pain Relief Journey",
      description: "Patient shares relief after spine treatment"
    },
    {
      url: "https://youtu.be/sQ6yA1ns1b8?si=kIvlq1Y8KeFpU6RP",
      title: "Fracture Recovery Experience",
      description: "Swift healing under expert orthopedic supervision"
    },
    {
      url: "https://youtu.be/87u6qeim6Ac?si=cbT3DloZzBA5cgfs",
      title: "Sports Injury Rehabilitation",
      description: "Athlete shares comeback story after injury treatment"
    }
  ],

  gynecology: [
    {
      url: "https://youtu.be/sPPxCGDMlDQ?si=qkxcAY6UbL6Hgy0N",
      title: "Safe and Happy Delivery Experience",
      description: "Mother shares joyful childbirth story"
    },
    {
      url: "https://youtu.be/NNb7GEp1J3k?si=rPVu5RrvlkvVzK64",
      title: "Women’s Health Awareness",
      description: "Insights into gynecological wellness and preventive care"
    },
    {
      url: "https://youtu.be/jzbJbYKLtiw?si=ylsA2n2trWHzFdue",
      title: "Fertility and Motherhood Journey",
      description: "Personal journey to becoming a parent with our fertility care"
    },
    {
      url: "https://youtu.be/0L_61AqREVc?si=1zpSgVwQZD2UH0HE",
      title: "Laparoscopic Surgery Story",
      description: "Patient shares minimally invasive gynecology surgery experience"
    }
  ],

  criticalCare: [
    {
      url: "https://youtube.com/shorts/cm1lOXqutjw?si=gEdATYUeceyMGSyI",
      title: "ICU Recovery Success",
      description: "Life saved in our advanced critical care unit"
    },
    {
      url: "https://youtube.com/shorts/RQDde7P1z-8?si=8OZvNSfP75SyQTP9",
      title: "Pulmonology Excellence",
      description: "Patient breathes easy again after respiratory crisis"
    }
  ],

  bloodBank: [
    {
      url: "https://www.youtube.com/shorts/NGidRgd3XFE",
      title: "Blood Donation Awareness",
      description: "Encouraging voluntary blood donations at our hospital"
    }
  ],

  pathology: [
    {
      url: "https://youtu.be/mPtWU2aaLfY?si=uzV0KU33k-ZjWeRk",
      title: "Accurate Diagnostic Reports",
      description: "Behind the scenes of our pathology lab’s precision"
    },
    {
      url: "https://www.facebook.com/reel/1129123309099418",
      title: "Pathology Department Highlights",
      description: "Technology-driven diagnostics for better outcomes"
    }
  ],

  dietitian: [
    {
      url: "https://www.youtube.com/shorts/zZg11xXWWzA",
      title: "Healthy Lifestyle Transformation",
      description: "Patient shares diet plan success with our dietitian"
    },
    {
      url: "https://www.youtube.com/shorts/VcNfze5Go20",
      title: "Nutrition Tips for Wellness",
      description: "Expert advice on balanced diets and healthy eating"
    }
  ],

  ambulance: [
    {
      url: "https://youtu.be/oc0YnKVnz64?si=tj_IzhWCvHStOFX4",
      title: "Emergency Response in Action",
      description: "How our ambulance team saves lives in golden hour"
    },
    {
      url: "https://youtu.be/BIT8M5VF0m8?si=GKzlAxQbocJfCUWl",
      title: "Swift Medical Transport",
      description: "Real-time look at our 24/7 emergency ambulance service"
    }
  ],

  eye: [
    {
      url: "https://youtu.be/NZ6yz2YU3qI?si=VsAm6h4QtJDMQJC0",
      title: "Cataract Surgery Success",
      description: "Clear vision restored after cataract surgery"
    },
    {
      url: "https://youtu.be/ysoS6vpwLXU?si=_QQ_hjsyfT2lUCr3",
      title: "LASIK Vision Correction Journey",
      description: "Patient enjoys glasses-free life after LASIK"
    }
  ],

  dentistry: [
    {
      url: "https://youtube.com/shorts/Xq4_EOngswU?si=RL3A1Lv6NS9SXeFK",
      title: "Smile Makeover Experience",
      description: "Patient shares confidence boost after dental treatment"
    }
  ],

  tpa: [
    {
      url: "https://youtube.com/shorts/mB18n0ESGv8?si=voYynwd1q_LpGRl2",
      title: "TPA Service Guide",
      description: "Understanding our seamless cashless insurance process"
    }
  ],

  dermatology: [
    {
      url: "https://youtube.com/shorts/1kpFngsBeNI?si=TiQiigtY3UkZvNUS",
      title: "Skin Glow Treatment Result",
      description: "Patient shares glowing skin transformation story"
    }
  ]
};


  // Safely handle undefined service before doing anything else
  if (!service) {
    return (
      <div className="min-h-screen bg-white text-gray-700 font-sans">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#002d72] leading-tight">
              Service Not Found
            </h1>
            <div className="w-16 h-1 bg-[#d4af37] mx-auto mb-8 rounded"></div>
            <p className="text-xl md:text-2xl font-serif text-[#444] mt-3">
              Please select a specific service from the Care Center menu.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Define formattedService BEFORE using it
  const formattedService = service
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Get video data for current service
const currentTestimonialData = serviceTestimonialsMap[service] || [];

// Process into cards
const currentTestimonials = currentTestimonialData.map((item, index) => {
  // Ensure item is an object with .url
  const url = typeof item === 'string' ? item : item.url;
  const title = typeof item === 'string' 
    ? `${formattedService} Patient Story ${index + 1}` 
    : item.title;
  const description = typeof item === 'string'
    ? `Recovery journey at All Is Well Hospital, Burhanpur`
    : item.description || `Recovery journey at All Is Well Hospital, Burhanpur`;

  const videoId = getYouTubeVideoId(url); // ✅ Now url is always a string

  return {
    title,
    description,
    videoUrl: url,
    image: videoId
      ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      : 'https://placehold.co/600x400/eee/31343C?text=No+Video',
  };
});


  // Doctor placeholder image
  const doctorPlaceholder = "https://placehold.co/400x400/E0E0E0/31343C/png";

  // Create a map of doctors for easy lookup by ID
  const doctorsMap = doctors.reduce((map, doctor) => {
    map[doctor.id] = doctor;
    return map;
  }, {});

  const serviceDetails = {
    "neuro-spine-surgery": {
      title: "Neuro and Spine Surgery Treatments",
      heroContent: [
        { 
          title: "Brain Tumor Surgery", 
          description: "Safe and precise removal of brain tumors using advanced neurosurgical techniques."
        },
        { 
          title: "Spine Decompression Surgery", 
          description: "Relieves pressure on spinal nerves to reduce pain and improve mobility."
        },
        { 
          title: "Disc Replacement", 
          description: "Minimally invasive procedure to replace damaged spinal discs with artificial ones."
        },
        { 
          title: "Spinal Fusion", 
          description: "Fuses two or more vertebrae to stabilize the spine and reduce chronic pain."
        },
        { 
          title: "Peripheral Nerve Surgery", 
          description: "Treats nerve damage and compressions affecting arms, legs, and other areas."
        },
        { 
          title: "Microvascular Decompression", 
          description: "A surgical option to relieve nerve compression causing severe facial pain or spasms."
        }
      ],
      doctorIds: [7], // Dr. Pravin R. Borde
      additionalInfo: {
        title: "Neuro and Spine Surgery Treatments",
        description: "Our expert team provides advanced surgical solutions for complex neuro and spine conditions, aiming for faster recovery and improved quality of life.",
        listItems: [
          "Brain Tumor Surgery",
          "Spine Decompression Surgery",
          "Disc Replacement",
          "Spinal Fusion",
          "Peripheral Nerve Surgery",
          "Microvascular Decompression"
        ]
      }
    },
    cardiology: {
      title: "Treatments Available in Cardiology",
      heroContent: [
        { 
          title: "Angioplasty", 
          description: "Minimally invasive procedure to open blocked or narrowed heart arteries."
        },
        { 
          title: "Pacemaker Implantation", 
          description: "Device installation to regulate abnormal heart rhythms effectively."
        },
        { 
          title: "Bypass Surgery", 
          description: "Restores normal blood flow to the heart by creating new pathways."
        },
        { 
          title: "Heart Valve Surgery", 
          description: "Repairs or replaces damaged heart valves for better cardiac function."
        },
        { 
          title: "Cardiac Rehabilitation", 
          description: "Supervised programs to improve heart health after cardiac events."
        },
        { 
          title: "ECG and Stress Tests", 
          description: "Comprehensive heart monitoring and stress evaluations for accurate diagnosis."
        }
      ],
      doctorIds: [5], // Dr. Lokendra Singh Thakur
      additionalInfo: {
        title: "Preventing Heart Disease",
        description: "Heart disease is one of the leading health concerns today. By taking preventive steps, you can protect your heart and lead a healthier life.",
        listItems: [
          "Eat a heart-healthy diet",
          "Stay physically active",
          "Avoid smoking and limit alcohol",
          "Maintain a healthy weight",
          "Go for regular health check-ups"
        ]
      }
    },
    "cardio-thoracic-surgery": {
      title: "Treatments Available in Thoracic Surgery",
      heroContent: [
        { 
          title: "Lobectomy", 
          description: "Removal of one lobe of the lung to treat lung cancer or severe infection."
        },
        { 
          title: "Video-Assisted Thoracoscopic Surgery (VATS)", 
          description: "Minimally invasive procedure using a camera and small instruments to access the chest cavity."
        },
        { 
          title: "Esophagectomy", 
          description: "Removal of part or all of the esophagus, typically for cancer treatment."
        },
        { 
          title: "Pleurodesis", 
          description: "A procedure to adhere the lung to the chest wall, preventing fluid or air buildup."
        },
        { 
          title: "Mediastinal Tumor Resection", 
          description: "Surgical removal of tumors located in the mediastinum, the central area of the chest cavity."
        },
        { 
          title: "Chest Wall Reconstruction", 
          description: "Repair or reconstruction of the chest wall due to trauma, infection, or cancer resection."
        }
      ],
      doctorIds: [5], // Dr. Lokendra Singh Thakur
      additionalInfo: {
        title: "Preventing Thoracic Conditions",
        description: "Thoracic health includes the lungs, esophagus, and chest wall. Preventive care is key to avoiding serious respiratory and thoracic disorders.",
        listItems: [
          "Avoid smoking and secondhand smoke",
          "Minimize exposure to air pollutants and toxic chemicals",
          "Get screened if you have a history of lung disease",
          "Practice breathing exercises and stay physically active",
          "Seek early treatment for persistent cough or chest pain"
        ]
      }
    },
    "plastic-surgery": {
      title: "Treatments Available in Plastic and Reconstructive",
      heroContent: [
        { 
          title: "Rhinoplasty", 
          description: "Reshapes the nose for aesthetic or functional improvement."
        },
        { 
          title: "Breast Reconstruction", 
          description: "Restores breast shape and appearance post-mastectomy or trauma."
        },
        { 
          title: "Facelift (Rhytidectomy)", 
          description: "Reduces facial wrinkles and sagging to provide a youthful look."
        },
        { 
          title: "Liposuction", 
          description: "Removes excess fat deposits to contour and reshape specific areas."
        },
        { 
          title: "Reconstructive Microsurgery", 
          description: "Restores complex structures using microsurgical techniques after injury or cancer."
        },
        { 
          title: "Burn and Scar Revision", 
          description: "Improves appearance and function of damaged or scarred skin."
        }
      ],
      doctorIds: [1], // Dr. Abhishek Sharma
      additionalInfo: {
        title: "Awareness in Plastic & Reconstructive Surgery",
        description: "Understanding plastic and reconstructive surgery is crucial for informed decisions and optimal outcomes. Awareness and early consultation help ensure both safety and satisfaction.",
        listItems: [
          "Consult board-certified plastic surgeons",
          "Understand the risks and realistic outcomes",
          "Opt for surgery only when medically or aesthetically necessary",
          "Follow pre and post-operative care guidelines strictly",
          "Go for regular follow-ups after surgery"
        ]
      }
    },
    urology: {
      title: "Treatments Available in Urology",
      heroContent: [
        { 
          title: "Kidney Stone Removal", 
          description: "Minimally invasive techniques to break or remove kidney stones effectively."
        },
        { 
          title: "Prostate Surgery", 
          description: "Treatment options for benign or malignant prostate conditions."
        },
        { 
          title: "Urinary Incontinence Treatment", 
          description: "Advanced therapies to manage involuntary urine leakage in men and women."
        },
        { 
          title: "Urethral Stricture Repair", 
          description: "Surgical correction of narrowed urethra to restore normal urine flow."
        },
        { 
          title: "Bladder Tumor Removal", 
          description: "Endoscopic and surgical removal of cancerous or benign bladder growths."
        },
        { 
          title: "Male Infertility Management", 
          description: "Diagnosis and treatment of male reproductive issues using surgical and non-surgical methods."
        }
      ],
      doctorIds: [3, 2], // Dr. Nikhil Tharkade, Dr. Prashant Khairnar
      additionalInfo: {
        title: "Urological Health & Prevention",
        description: "Maintaining urological health is essential for overall well-being. Simple lifestyle choices and timely checkups can prevent many urinary and reproductive system disorders.",
        listItems: [
          "Stay hydrated to support kidney and bladder function",
          "Don't delay urination to avoid bladder issues",
          "Quit smoking to reduce the risk of bladder cancer",
          "Maintain a healthy weight to avoid urinary incontinence",
          "Get regular urological screenings, especially over age 40"
        ]
      }
    },

  oncology: {
    title: "Treatments Available in Oncology",
    heroContent: [
      { 
        title: "Chemotherapy", 
        description: "Uses drugs to destroy or slow the growth of cancer cells throughout the body."
      },
      { 
        title: "Radiation Therapy", 
        description: "Targets and kills cancer cells using high-energy radiation with precision."
      },
      { 
        title: "Immunotherapy", 
        description: "Boosts the body's natural defenses to fight cancer effectively."
      },
      { 
        title: "Targeted Therapy", 
        description: "Uses drugs that target specific genes or proteins involved in cancer growth."
      },
      { 
        title: "Surgical Oncology", 
        description: "Involves surgical removal of tumors and surrounding tissue as needed."
      },
      { 
        title: "Bone Marrow Transplant", 
        description: "Replaces damaged bone marrow with healthy cells to restore function."
      }
    ],
    doctorIds: [20, 21], // Dr. Rakesh Mahawar, Dr. Deepak K. Bhojwani
    additionalInfo: {
      title: "Preventing Cancer",
      description: "While not all cancers are preventable, making informed lifestyle choices can significantly reduce your risk. Here are key steps for cancer prevention:",
      listItems: [
        "Maintain a nutritious, balanced diet",
        "Engage in regular physical activity",
        "Avoid tobacco and limit alcohol intake",
        "Protect your skin from harmful UV rays",
        "Get regular screenings and medical check-ups"
      ]
    }
  },
  gastroenterology: {
    title: "Treatments Available in Gastroenterology",
    heroContent: [
      { 
        title: "Endoscopy", 
        description: "Minimally invasive procedure to view the digestive tract using a flexible tube with a camera."
      },
      { 
        title: "Colonoscopy", 
        description: "Diagnostic procedure to examine the large intestine for abnormalities and screen for colon cancer."
      },
      { 
        title: "Liver Disease Management", 
        description: "Comprehensive care for conditions like hepatitis, cirrhosis, and fatty liver disease."
      },
      { 
        title: "IBD & IBS Treatment", 
        description: "Advanced therapies for managing Crohn's disease, ulcerative colitis, and irritable bowel syndrome."
      },
      { 
        title: "GERD & Acid Reflux Care", 
        description: "Effective solutions for chronic heartburn and reflux symptoms."
      },
      { 
        title: "Digestive Cancer Screening", 
        description: "Early detection programs for gastrointestinal cancers like stomach, colon, and pancreatic cancer."
      }
    ],
    doctorIds: [22], // Dr. Bhushan Chopde
    additionalInfo: {
      title: "Preventing Digestive Disorders",
      description: "Maintaining good digestive health is essential for overall well-being. Small lifestyle changes can help prevent common gastrointestinal issues.",
      listItems: [
        "Eat a fiber-rich, balanced diet",
        "Avoid overeating and eat at regular intervals",
        "Stay well-hydrated throughout the day",
        "Avoid smoking and limit alcohol consumption",
        "Get routine screenings for digestive health"
      ]
    }
  },
  endocrinology: {
    title: "Treatments Available in Endocrinology",
    heroContent: [
      { 
        title: "Diabetes Management", 
        description: "Comprehensive care for Type 1, Type 2, and gestational diabetes with medication and lifestyle plans."
      },
      { 
        title: "Thyroid Disorder Treatment", 
        description: "Diagnosis and management of hypothyroidism, hyperthyroidism, goiter, and thyroid nodules."
      },
      { 
        title: "Hormonal Imbalance Therapy", 
        description: "Customized treatments for conditions like PCOS, menopause, and adrenal disorders."
      },
      { 
        title: "Osteoporosis Care", 
        description: "Evaluation and treatment of bone health to prevent fractures and improve strength."
      },
      { 
        title: "Pituitary Gland Disorders", 
        description: "Specialized care for hormone-producing pituitary tumors and related endocrine conditions."
      },
      { 
        title: "Metabolic Syndrome Treatment", 
        description: "Integrated approach to manage obesity, insulin resistance, high blood pressure, and cholesterol."
      }
    ],
    doctorIds: [24], // Dr. Chimu Chinte Chopde
    additionalInfo: {
      title: "Managing Hormonal Health",
      description: "Hormonal imbalances can affect many aspects of your health. Proactive management helps you maintain well-being and prevent long-term complications.",
      listItems: [
        "Follow a balanced, nutrient-rich diet",
        "Stay physically active to support metabolism",
        "Maintain a healthy body weight",
        "Monitor blood sugar, thyroid, and hormone levels",
        "Consult an endocrinologist for regular evaluations"
      ]
    }
  },
  rheumatology: {
    title: "Treatments Available in Rheumatology",
    heroContent: [
      { 
        title: "Rheumatoid Arthritis Management", 
        description: "Targeted therapies to reduce joint inflammation and slow disease progression."
      },
      { 
        title: "Lupus Treatment", 
        description: "Comprehensive care for systemic lupus erythematosus to control symptoms and prevent flares."
      },
      { 
        title: "Osteoporosis Therapy", 
        description: "Medications and lifestyle guidance to strengthen bones and prevent fractures."
      },
      { 
        title: "Joint Injections", 
        description: "Corticosteroid or hyaluronic acid injections for targeted pain and inflammation relief."
      },
      { 
        title: "Gout Management", 
        description: "Dietary guidance and medications to prevent and manage painful gout attacks."
      },
      { 
        title: "Autoimmune Disease Evaluation", 
        description: "Detailed assessments to diagnose and tailor treatment plans for complex autoimmune conditions."
      }
    ],
    doctorIds: [29], // Dr. Rupali Marathe
    additionalInfo: {
      title: "Supporting Joint and Autoimmune Health",
      description: "Rheumatological conditions like arthritis and autoimmune diseases can impact daily life. Early intervention and proper care can improve mobility and quality of life.",
      listItems: [
        "Engage in low-impact exercise to maintain joint flexibility",
        "Follow an anti-inflammatory diet rich in whole foods",
        "Take medications as prescribed to manage symptoms",
        "Get regular checkups to monitor disease progression",
        "Incorporate stress-reducing activities like yoga or meditation"
      ]
    }
  },
  radiology: {
    title: "Treatments Available in Radiology",
    heroContent: [
      { 
        title: "X-Ray", 
        description: "Quick and painless imaging to examine bones, lungs, and other internal structures."
      },
      { 
        title: "Ultrasound", 
        description: "Safe, non-invasive imaging using sound waves to view organs and soft tissues."
      },
      { 
        title: "MRI Scan", 
        description: "Detailed imaging technique to visualize organs, joints, and tissues using magnetic fields."
      },
      { 
        title: "CT Scan", 
        description: "Advanced cross-sectional imaging for detecting diseases, injuries, and internal abnormalities."
      },
      { 
        title: "Mammography", 
        description: "Specialized X-ray for early detection and diagnosis of breast conditions."
      },
      { 
        title: "Fluoroscopy", 
        description: "Real-time moving X-ray imaging to observe internal organs during diagnostic or therapeutic procedures."
      }
    ],
    doctorIds: [4], // Dr. Shweta Narwade
    additionalInfo: {
      title: "Importance of Radiology & Imaging",
      description: "Radiology plays a crucial role in modern healthcare by allowing accurate diagnosis and monitoring of various medical conditions through advanced imaging techniques.",
      listItems: [
        "Detect internal injuries and fractures quickly",
        "Identify tumors and abnormal growths",
        "Examine brain and spinal cord conditions",
        "Guide minimally invasive procedures",
        "Support early detection and timely treatment"
      ]
    }
  },

  "critical-care": {
    title: "Treatments Available in Critical Care Medicine",
    heroContent: [
      { 
        title: "Intensive Care Unit (ICU)", 
        description: "24/7 monitoring and support for critically ill patients with life-threatening conditions."
      },
      { 
        title: "Ventilator Support", 
        description: "Advanced respiratory assistance for patients with severe breathing problems."
      },
      { 
        title: "Sepsis Management", 
        description: "Rapid diagnosis and treatment of life-threatening infections and septic shock."
      },
      { 
        title: "Post-Surgical Critical Care", 
        description: "Specialized monitoring and recovery support following major surgeries."
      },
      { 
        title: "Multisystem Organ Support", 
        description: "Coordinated care for patients with failure of multiple organ systems."
      },
      { 
        title: "Emergency Response Team", 
        description: "Rapid intervention for sudden deteriorations and critical emergencies within the hospital."
      }
    ],
    doctorIds: [19], // Dr. Shubham Verma
    additionalInfo: {
      title: "Critical Care Medicine",
      description: "Critical care medicine provides life-saving support for patients with serious health conditions. Our specialized team ensures continuous monitoring and advanced treatment in a controlled environment.",
      listItems: [
        "24/7 intensive care and monitoring",
        "Advanced ventilator and respiratory support",
        "Rapid sepsis and infection control",
        "Multidisciplinary expert team management",
        "Emergency response and stabilization"
      ]
    }
  },
  "anaesthesia": {
    title: "Treatments Available in Anaesthesia and Pain",
    heroContent: [
      { 
        title: "Preoperative Assessment", 
        description: "Thorough evaluation of patients to determine the safest anesthesia plan tailored to individual needs."
      },
      { 
        title: "General Anaesthesia", 
        description: "Complete sedation techniques ensuring pain-free surgeries with continuous monitoring and safety."
      },
      { 
        title: "Regional Anaesthesia", 
        description: "Targeted nerve blocks and spinal/epidural anesthesia for specific procedures with minimal side effects."
      },
      { 
        title: "Pain Management Clinics", 
        description: "Advanced, non-invasive therapies for chronic pain including back pain, arthritis, and neuropathy."
      },
      { 
        title: "Postoperative Pain Control", 
        description: "Comprehensive care to reduce discomfort and speed up recovery after surgery."
      },
      { 
        title: "Critical Care Sedation", 
        description: "Sedation and pain relief for patients in ICU requiring ventilator or intensive treatments."
      }
    ],
    doctorIds: [28], // Dr. Hiteshi Bais
    additionalInfo: {
      title: "Anaesthesia and Pain Management",
      description: "Anaesthesia and pain management play a vital role in ensuring patient comfort and safety before, during, and after medical procedures. Our team uses modern techniques to deliver personalized and effective care.",
      listItems: [
        "Preoperative assessments for safe anesthesia planning",
        "Safe administration of general and regional anesthesia",
        "Continuous monitoring during surgeries",
        "Postoperative pain relief strategies",
        "Advanced treatments for chronic pain conditions"
      ]
    }
  },
  "general-and-minimal-invasive-surgery": {
    title: "Treatments Available in General and Minimal Invasive Surgery",
    heroContent: [
      { 
        title: "Laparoscopic Appendectomy", 
        description: "Minimally invasive removal of the appendix through small incisions using a laparoscope."
      },
      { 
        title: "Gallbladder Removal (Cholecystectomy)", 
        description: "Safe and effective keyhole surgery to remove an inflamed or stone-filled gallbladder."
      },
      { 
        title: "Hernia Repair", 
        description: "Minimally invasive or open procedure to correct abdominal wall hernias and reinforce tissues."
      },
      { 
        title: "Colon Surgery", 
        description: "Surgical treatment of colon diseases using modern minimally invasive or open approaches."
      },
      { 
        title: "Thyroid Surgery", 
        description: "Removal of part or all of the thyroid gland to treat thyroid nodules, goiter, or cancer."
      },
      { 
        title: "Breast Lump Removal", 
        description: "Surgical excision of benign or suspicious breast lumps with minimal scarring techniques."
      }
    ],
    doctorIds: [12], // Dr. Gaurav Singh Pardesi
    additionalInfo: {
      title: "Understanding General & Minimal Invasive Surgery",
      description: "Modern surgical techniques offer faster recovery, less pain, and smaller scars. Learn how general and minimally invasive surgeries improve patient outcomes.",
      listItems: [
        "Less pain and faster recovery times",
        "Smaller incisions reduce infection risk",
        "Shorter hospital stays",
        "Used for common conditions like hernias, appendicitis, and gallstones",
        "Performed by skilled surgeons using advanced tools"
      ]
    }
  },
  "general-medicine": {
    title: "Treatments Available in General Medicine",
    heroContent: [
      { 
        title: "Diabetes Management", 
        description: "Comprehensive care plans to monitor and control blood sugar levels effectively."
      },
      { 
        title: "Hypertension Treatment", 
        description: "Ongoing care and medication to maintain healthy blood pressure levels."
      },
      { 
        title: "Thyroid Disorder Care", 
        description: "Diagnosis and treatment for hypo/hyperthyroidism and other thyroid conditions."
      },
      { 
        title: "Infection Management", 
        description: "Effective treatment of viral, bacterial, and seasonal infections with proper diagnosis."
      },
      { 
        title: "Routine Health Checkups", 
        description: "Regular screenings and diagnostics to track overall health and prevent complications."
      },
      { 
        title: "Allergy & Asthma Care", 
        description: "Personalized treatment plans for chronic allergies and asthma control."
      }
    ],
    doctorIds: [5], // Dr. Lokendra Singh Thakur
    additionalInfo: {
      title: "General Health & Wellness Tips",
      description: "Staying healthy starts with regular habits and preventive care. General Medicine focuses on overall well-being through lifestyle awareness, early diagnosis, and timely treatment.",
      listItems: [
        "Eat a balanced and nutritious diet",
        "Schedule routine medical checkups",
        "Take medications as prescribed",
        "Manage stress and mental health",
        "Stay updated on vaccinations"
      ]
    }
  },
  "internal-medicine": {
    title: "Treatments Available in Internal Medicine",
    heroContent: [
      { 
        title: "Diabetes Care", 
        description: "Personalized plans to manage blood sugar levels and prevent complications."
      },
      { 
        title: "Hypertension Management", 
        description: "Monitoring and treating high blood pressure to reduce cardiovascular risks."
      },
      { 
        title: "Thyroid Disorder Treatment", 
        description: "Comprehensive care for hypothyroidism, hyperthyroidism, and goiters."
      },
      { 
        title: "Lipid & Cholesterol Control", 
        description: "Managing abnormal lipid profiles through diet, lifestyle, and medication."
      },
      { 
        title: "Fever & Infection Care", 
        description: "Diagnosis and treatment of acute conditions like viral, bacterial, and seasonal infections."
      },
      { 
        title: "Comprehensive Health Checkups", 
        description: "Routine exams and diagnostic tests for early detection and preventive care."
      }
    ],
    doctorIds: [10, 11], // Dr. Divyesh Lad, Dr. Jayesh Dubey
    additionalInfo: {
      title: "Internal Medicine Essentials",
      description: "Internal Medicine focuses on the prevention, diagnosis, and treatment of adult diseases. Our physicians are trained to manage complex conditions and provide long-term care.",
      listItems: [
        "Comprehensive adult health evaluations",
        "Management of chronic diseases like diabetes and hypertension",
        "Coordinated care for multiple conditions",
        "Accurate diagnosis through advanced investigations",
        "Continuity of care for long-term wellness"
      ]
    }
  },

  "obstetrics-and-gynaecology": {
    title: "Treatments Available in Obstetrics and Gynaecology",
    heroContent: [
      { 
        title: "Antenatal Care", 
        description: "Regular checkups and monitoring to ensure a healthy pregnancy journey."
      },
      { 
        title: "Normal & C-Section Delivery", 
        description: "Safe and personalized birthing options handled by experienced specialists."
      },
      { 
        title: "Gynecological Surgeries", 
        description: "Advanced surgical care for fibroids, cysts, endometriosis, and more."
      },
      { 
        title: "Menstrual Disorder Treatment", 
        description: "Effective diagnosis and treatment of irregular, painful, or heavy periods."
      },
      { 
        title: "Infertility Management", 
        description: "Expert evaluation and support to assist couples in conceiving naturally or with assistance."
      },
      { 
        title: "Postnatal Care", 
        description: "Health checkups, lactation support, and recovery guidance after childbirth."
      }
    ],
    doctorIds: [13, 14], // DR. KIMAYA SALI MEDSHIKAR, Dr. Monish Gupta
    additionalInfo: {
      title: "Women's Health & Wellness",
      description: "Maintaining reproductive and overall health is vital at every stage of a woman's life. Preventive care and regular screenings help ensure long-term well-being and early diagnosis of conditions.",
      listItems: [
        "Schedule routine gynecological check-ups",
        "Plan and monitor pregnancy with expert guidance",
        "Screen regularly for cervical and breast cancer",
        "Manage PCOS, menopause, and hormonal balance",
        "Adopt healthy habits for lifelong reproductive health"
      ]
    }
  },
  orthopaedics: {
    title: "Treatments Available in Orthopaedics",
    heroContent: [
      { 
        title: "Arthroscopy", 
        description: "Minimally invasive surgery to diagnose and treat joint problems."
      },
      { 
        title: "Joint Replacement Surgery", 
        description: "Replacing damaged joints with artificial implants to restore mobility."
      },
      { 
        title: "Fracture Management", 
        description: "Care and treatment of broken bones including casting and surgery."
      },
      { 
        title: "Spinal Surgery", 
        description: "Procedures to correct spinal disorders and relieve nerve pressure."
      },
      { 
        title: "Physical Therapy", 
        description: "Rehabilitation to improve strength, mobility, and function after injury."
      },
      { 
        title: "Sports Injury Treatment", 
        description: "Specialized care for injuries sustained during sports activities."
      }
    ],
    doctorIds: [8], // Dr. Ravnik R. Bansod
    additionalInfo: {
      title: "Preventing Orthopaedic Problems",
      description: "Bone and joint health is vital for mobility and quality of life. By adopting a proactive lifestyle, you can prevent many common orthopaedic conditions.",
      listItems: [
        "Engage in regular strength and flexibility exercises",
        "Follow a balanced diet rich in calcium and vitamin D",
        "Use proper footwear to support joints",
        "Maintain good posture and ergonomic habits",
        "Schedule regular orthopaedic check-ups"
      ]
    }
  },
  pathology: {
    title: "Treatments Available in Pathology",
    heroContent: [
      { 
        title: "Complete Blood Count (CBC)", 
        description: "Evaluates overall health and detects a wide range of disorders, including anemia and infection."
      },
      { 
        title: "Liver Function Test", 
        description: "Assesses the health and functionality of your liver through enzyme and protein levels."
      },
      { 
        title: "Kidney Function Test", 
        description: "Measures waste products, electrolyte levels, and kidney performance."
      },
      { 
        title: "Thyroid Profile", 
        description: "Helps diagnose thyroid imbalances including hypothyroidism or hyperthyroidism."
      },
      { 
        title: "Urine Routine & Microscopy", 
        description: "Detects abnormalities in urine that could indicate infections or systemic issues."
      },
      { 
        title: "Blood Sugar Test", 
        description: "Measures glucose levels to diagnose and monitor diabetes."
      }
    ],
    doctorIds: [15, 16], // Dr. Rashi Gupta, Dr. Harshada Bhangale
    additionalInfo: {
      title: "Importance of Regular Pathology Tests",
      description: "Routine pathology testing is key to early detection and prevention of numerous health conditions. These tests provide vital insights into your body's function and help guide timely treatment decisions.",
      listItems: [
        "Get periodic blood tests to detect issues early",
        "Use genetic screening if there's a family history of disease",
        "Biopsy analysis for abnormal tissue growth",
        "Regular urine and stool analysis for systemic checks",
        "Monitor chronic conditions through lab follow-ups"
      ]
    }
  },
  haematology: {
    title: "Treatments Available in Haematology",
    heroContent: [
      { 
        title: "Blood Transfusion", 
        description: "Replacement of lost components of the blood to manage anemia, bleeding, or disorders."
      },
      { 
        title: "Bone Marrow Biopsy", 
        description: "Diagnostic procedure to examine bone marrow function and detect blood cancers."
      },
      { 
        title: "Iron Therapy", 
        description: "Treatment for iron deficiency anemia using oral or IV iron supplements."
      },
      { 
        title: "Chemotherapy for Blood Cancers", 
        description: "Drug-based treatment for leukemia, lymphoma, and multiple myeloma."
      },
      { 
        title: "Plasmapheresis", 
        description: "Procedure to remove harmful antibodies from blood in autoimmune or blood disorders."
      },
      { 
        title: "Coagulation Testing", 
        description: "Tests to assess blood clotting ability, essential in diagnosing bleeding disorders."
      }
    ],
    doctorIds: [2], // Dr. Ankit Atneriya (Note: Ankit Atneriya is ID 2 in the doctors array, but the specialty is Urology. I will assume this is a typo in the original serviceDetails and use ID 2 for now. If this is incorrect, the user will need to clarify.)
    additionalInfo: {
      title: "Maintaining Haematological Health",
      description: "Haematology focuses on the health of your blood and blood-forming organs. Follow these steps to maintain strong haematological health and prevent common blood disorders.",
      listItems: [
        "Eat iron-rich and folate-rich foods",
        "Get regular blood tests",
        "Take supplements only as prescribed",
        "Prevent infections through hygiene and vaccines",
        "Consult a haematologist if symptoms arise"
      ]
    }
  },
  "blood-bank": {
    title: "Treatments Available in Blood Bank",
    heroContent: [
      { 
        title: "Blood Donation", 
        description: "Voluntary donation of blood to save lives during medical emergencies and surgeries."
      },
      { 
        title: "Blood Typing & Matching", 
        description: "Accurate blood group identification and compatibility testing for safe transfusions."
      },
      { 
        title: "Component Separation", 
        description: "Processing of donated blood into red cells, plasma, and platelets for targeted use."
      },
      { 
        title: "Plasma Donation", 
        description: "Collection of plasma for patients needing immune support or specific protein treatments."
      },
      { 
        title: "Platelet Apheresis", 
        description: "Advanced donation technique for collecting concentrated platelets from donors."
      },
      { 
        title: "Blood Storage & Distribution", 
        description: "Safe storage and efficient supply of blood products to hospitals and emergency units."
      }
    ],
    doctorIds: [15, 16], // Dr. Rashi Gupta, Dr. Harshada Bhangale
    additionalInfo: {
      title: "Importance of Blood Donation",
      description: "Donating blood is a selfless act that saves lives. With every donation, you contribute to emergencies, surgeries, and patients battling chronic illnesses.",
      listItems: [
        "One donation can save up to three lives",
        "Supports hospitals during critical shortages",
        "Helps accident, surgery, and cancer patients",
        "Can be donated every 3 months",
        "Promotes community health and solidarity"
      ]
    }
  },

  ent: {
    title: "Treatments Available in ENT",
    heroContent: [
      { 
        title: "Tonsillectomy", 
        description: "Surgical removal of the tonsils to treat chronic infections and breathing issues."
      },
      { 
        title: "Septoplasty", 
        description: "Correction of a deviated nasal septum to improve breathing."
      },
      { 
        title: "Sinus Surgery", 
        description: "Endoscopic procedure to relieve chronic sinusitis and improve sinus drainage."
      },
      { 
        title: "Myringotomy", 
        description: "Small incision in the eardrum to relieve pressure or drain fluid from the middle ear."
      },
      { 
        title: "Hearing Aid Fitting", 
        description: "Assessment and fitting of hearing devices for various levels of hearing loss."
      },
      { 
        title: "Voice Therapy", 
        description: "Non-surgical treatment to improve vocal disorders through specialized exercises."
      }
    ],
    doctorIds: [9], // Dr. Rahul Chandrakant Khandekar
    additionalInfo: {
      title: "ENT Health Awareness",
      description: "Ear, nose, and throat (ENT) health is vital for proper breathing, hearing, balance, and overall comfort. Early detection and care can prevent chronic issues.",
      listItems: [
        "Get regular hearing check-ups",
        "Protect ears from loud noises",
        "Treat sinus issues early to avoid infections",
        "Don't ignore chronic sore throats or hoarseness",
        "Consult an ENT specialist for persistent symptoms"
      ]
    }
  },
  ophthalmology: {
    title: "Treatments Available in Ophthalmology",
    heroContent: [
      { 
        title: "Cataract Surgery", 
        description: "Removes clouded lenses and replaces them with clear artificial lenses for better vision."
      },
      { 
        title: "LASIK & Refractive Surgery", 
        description: "Laser procedures to correct nearsightedness, farsightedness, and astigmatism."
      },
      { 
        title: "Glaucoma Management", 
        description: "Monitoring and treatment to reduce eye pressure and preserve vision."
      },
      { 
        title: "Retinal Treatment", 
        description: "Care for conditions like diabetic retinopathy and retinal detachment."
      },
      { 
        title: "Comprehensive Eye Exams", 
        description: "Routine screenings to detect vision problems and eye diseases early."
      },
      { 
        title: "Pediatric Eye Care", 
        description: "Specialized care for children's eye development and vision correction."
      }
    ],
    doctorIds: [18], // Dr. Apurva Yadav
    additionalInfo: {
      title: "Protecting Your Vision",
      description: "Maintaining eye health is crucial for your overall quality of life. Early detection and regular check-ups can prevent many vision problems.",
      listItems: [
        "Schedule regular eye exams",
        "Wear sunglasses to protect against UV rays",
        "Take breaks from screens to avoid eye strain",
        "Use eye drops to prevent dryness when needed",
        "Consult an ophthalmologist for any vision changes"
      ]
    }
  },
  dermatology: {
    title: "Treatments Available in Dermatology",
    heroContent: [
      { 
        title: "Acne Treatment", 
        description: "Personalized therapies to manage and reduce acne and prevent scarring."
      },
      { 
        title: "Skin Allergy Testing", 
        description: "Identifies specific allergens causing skin reactions and irritation."
      },
      { 
        title: "Psoriasis & Eczema Care", 
        description: "Ongoing management of chronic skin conditions through medications and therapies."
      },
      { 
        title: "Mole & Skin Tag Removal", 
        description: "Safe procedures for the removal of unwanted or suspicious skin growths."
      },
      { 
        title: "Laser Skin Treatments", 
        description: "Advanced laser procedures for pigmentation, scars, and skin rejuvenation."
      },
      { 
        title: "Anti-Aging Solutions", 
        description: "Non-surgical treatments to reduce wrinkles and enhance skin texture."
      }
    ],
    doctorIds: [25], // Dr. Nikita Andhalkar
    additionalInfo: {
      title: "Maintaining Healthy Skin",
      description: "Your skin is your body's largest organ and your first line of defense. Proper care and early attention can help prevent common skin problems and maintain a healthy glow.",
      listItems: [
        "Use sunscreen daily to prevent UV damage",
        "Keep your skin hydrated with moisturizers",
        "Cleanse your skin gently and regularly",
        "See a dermatologist for persistent rashes or acne",
        "Avoid harsh products and follow a proper skincare routine"
      ]
    }
  },
  psychiatry: {
    title: "Treatments Available in Psychiatry",
    heroContent: [
      { 
        title: "Depression Treatment", 
        description: "Therapy and medication plans tailored to help manage and overcome depression."
      },
      { 
        title: "Anxiety Management", 
        description: "Structured programs including CBT and mindfulness to manage anxiety disorders."
      },
      { 
        title: "Psychiatric Evaluation", 
        description: "Comprehensive mental health assessments to diagnose and guide treatment."
      },
      { 
        title: "Medication Management", 
        description: "Careful prescription and monitoring of psychiatric medications by specialists."
      },
      { 
        title: "Child & Adolescent Psychiatry", 
        description: "Specialized mental health care for young patients dealing with emotional issues."
      },
      { 
        title: "Substance Abuse Therapy", 
        description: "Support and treatment for addiction recovery, including dual diagnosis care."
      }
    ],
    doctorIds: [23], // Dr. Yash Mahajan
    additionalInfo: {
      title: "Promoting Mental Wellness",
      description: "Mental health is just as important as physical health. Taking small, consistent steps can make a big difference in emotional well-being and stress management.",
      listItems: [
        "Practice mindfulness and meditation regularly",
        "Stay socially connected and talk to trusted people",
        "Prioritize sleep and rest to support brain function",
        "Exercise to improve mood and reduce anxiety",
        "Seek help from a mental health professional when needed"
      ]
    }
  },
  dental: {
    title: "Treatments Available in Dental",
    heroContent: [
      { 
        title: "Dental Check-Up", 
        description: "Routine oral exams and cleanings to maintain optimal dental health."
      },
      { 
        title: "Tooth Extraction", 
        description: "Safe removal of damaged, decayed, or impacted teeth when necessary."
      },
      { 
        title: "Root Canal Treatment", 
        description: "Procedure to treat infected tooth pulp and preserve the natural tooth."
      },
      { 
        title: "Dental Implants", 
        description: "Permanent solutions for missing teeth using titanium-supported implants."
      },
      { 
        title: "Braces & Aligners", 
        description: "Orthodontic treatments to correct misaligned teeth and bites."
      },
      { 
        title: "Teeth Whitening", 
        description: "Cosmetic procedure to brighten your smile and remove surface stains."
      }
    ],
    doctorIds: [30], // Dr. Tanishk Shroff
    additionalInfo: {
      title: "Maintaining Oral Health",
      description: "Good oral hygiene is essential for overall health. Simple daily habits can prevent cavities, gum disease, and other dental issues.",
      listItems: [
        "Brush your teeth twice a day with fluoride toothpaste",
        "Floss daily to remove plaque between teeth",
        "Maintain a balanced diet and limit sugary snacks",
        "Visit your dentist regularly for check-ups",
        "Avoid tobacco and maintain a clean, fresh smile"
      ]
    }
  },

  yoga: {
    title: "Treatments Available in Yoga",
    heroContent: [
      { 
        title: "Hatha Yoga", 
        description: "Focuses on physical postures and breathing techniques to improve balance and flexibility."
      },
      { 
        title: "Vinyasa Flow", 
        description: "A dynamic sequence of poses linked to breath, promoting strength and fluid movement."
      },
      { 
        title: "Yin Yoga", 
        description: "Targets deep connective tissues with slow, meditative stretches held for longer periods."
      },
      { 
        title: "Pranayama", 
        description: "Breathing exercises designed to control life force energy and enhance mental clarity."
      },
      { 
        title: "Meditation & Mindfulness", 
        description: "Practices to cultivate awareness, reduce stress, and bring mental peace and focus."
      },
      { 
        title: "Yoga Therapy", 
        description: "Customized yoga-based approach to support healing from physical or emotional issues."
      }
    ],
    doctorIds: [31], // Nazma Maam
    additionalInfo: {
      title: "Benefits of Practicing Yoga",
      description: "Yoga is a holistic practice that supports both physical and mental well-being. Regular yoga helps bring balance, flexibility, and inner peace.",
      listItems: [
        "Reduces stress and anxiety",
        "Improves flexibility and posture",
        "Enhances heart and lung function",
        "Promotes mental clarity and focus",
        "Supports overall wellness and mindfulness"
      ]
    }
  },
  physiotherapy: {
    title: "Treatments Available in Physiotherapy",
    heroContent: [
      { 
        title: "Manual Therapy", 
        description: "Hands-on techniques to reduce pain, improve mobility, and restore function."
      },
      { 
        title: "Post-Surgical Rehab", 
        description: "Personalized recovery plans to restore strength and function after surgery."
      },
      { 
        title: "Electrotherapy", 
        description: "Use of electrical stimulation to relieve pain and promote healing."
      },
      { 
        title: "Exercise Therapy", 
        description: "Customized physical exercises to improve strength, flexibility, and endurance."
      },
      { 
        title: "Sports Injury Rehab", 
        description: "Targeted treatments to recover from athletic injuries and prevent recurrence."
      },
      { 
        title: "Posture & Ergonomic Training", 
        description: "Education and exercises to correct posture and reduce strain from daily activities."
      }
    ],
    doctorIds: [29], // Dr. Rupali Marathe
    additionalInfo: {
      title: "Benefits of Physiotherapy",
      description: "Physiotherapy plays a vital role in pain management, injury recovery, and improving physical mobility. It empowers patients to regain strength and live pain-free.",
      listItems: [
        "Restores movement and function",
        "Improves posture and flexibility",
        "Aids in recovery after injury or surgery",
        "Reduces pain through therapeutic techniques",
        "Personalized treatment plans for every condition"
      ]
    }
  },
  "nutrition-and-diet": {
    title: "Treatments Available in Nutrition and Diet",
    heroContent: [
      { 
        title: "Personalized Meal Planning", 
        description: "Custom nutrition plans tailored to your health goals and dietary preferences."
      },
      { 
        title: "Weight Management", 
        description: "Structured support for healthy weight loss or gain through balanced eating."
      },
      { 
        title: "Diabetes Nutrition", 
        description: "Dietary guidance to manage blood sugar levels and improve overall wellness."
      },
      { 
        title: "Sports Nutrition", 
        description: "Fuel your performance with science-backed strategies for active lifestyles."
      },
      { 
        title: "Digestive Health", 
        description: "Dietary solutions to support gut health and reduce digestive discomfort."
      },
      { 
        title: "Nutrition Counseling", 
        description: "One-on-one sessions with a dietitian for education, support, and accountability."
      }
    ],
    doctorIds: [31], // Nazma Maam
    additionalInfo: {
      title: "Healthy Nutrition & Diet Tips",
      description: "Good nutrition is the foundation of overall well-being. A balanced diet supports energy, immunity, and reduces the risk of chronic illness.",
      listItems: [
        "Include a variety of fruits and vegetables daily",
        "Choose whole grains over refined carbs",
        "Incorporate lean proteins and healthy fats",
        "Stay hydrated and limit sugary drinks",
        "Consult a dietitian for personalized advice"
      ]
    }
  }

    
  };

  

  const currentService = serviceDetails[service];
  if (!currentService) {
    return (
      <div className="min-h-screen bg-white text-gray-700 font-sans">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#002d72] leading-tight">
              Service Not Found
            </h1>
            <div className="w-16 h-1 bg-[#d4af37] mx-auto mb-8 rounded"></div>
            <p className="text-xl md:text-2xl font-serif text-[#444] mt-3">
              The requested care center service does not exist.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-700 font-sans">
      {/* Hero Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#002d72] text-center mb-8">
            {currentService.title}
          </h1>
          {/* Using the new CardComponent */}
          <CardComponent items={currentService.heroContent} />
        </div>
      </div>
      
      {/* Rest of the component remains unchanged */}
      {/* About Section */}
      <div className="py-12 bg-[#f9f9f9]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/2">
              <p className="font-sans text-[#444] mb-4 leading-relaxed">
                At All Is Well Multispecialty Hospital, we are committed to delivering healthcare that meets the highest standards of excellence. We have built a trusted ecosystem that brings together expert clinicians, advanced medical technology, modern infrastructure, and a continuous focus on research and innovation.
              </p>
              <p className="font-sans text-[#444] mb-4 leading-relaxed">
                Our {currentService.title.split(' ')[0]} Institute follows a fully integrated approach, where specialists from various departments collaborate to provide the most effective and personalized treatment for every patient. This seamless coordination ensures that patient care always remains our top priority.
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className={`flex ${currentService.doctorIds.length > 1 ? 'flex-col sm:flex-row' : 'flex-col'} gap-6 justify-center items-center`}>
                {currentService.doctorIds.map(id => {
                  const doctor = doctorsMap[id];
                  if (!doctor) return null; // Handle case where doctor ID is not found

                  return (
                    <div key={id} className={`w-full ${currentService.doctorIds.length > 1 ? 'sm:w-1/2' : ''}`}>
                      <div className="w-full max-w-[300px] aspect-square overflow-hidden rounded-lg mx-auto">
                        <img
                          src={doctor.image || doctorPlaceholder}
                          alt={doctor.name}
                          className="w-full h-full object-cover object-center shadow-md max-w-full"
                          loading="lazy"
                          onError={(e) => { e.target.onerror = null; e.target.src = doctorPlaceholder; }}
                        />
                      </div>
                      <div className="mt-4 text-center">
                        <h3 className={`font-serif font-bold text-[#002d72] ${currentService.doctorIds.length > 1 ? 'text-lg' : 'text-xl'}`}>
                          {doctor.name}
                        </h3>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-2 text-center">
                {currentService.doctorIds.map(id => {
                  const doctor = doctorsMap[id];
                  if (!doctor) return null;
                  return (
                    <p key={`qualification-${id}`} className="text-primary-gold">
                      {doctor.specialty}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-8 space-x-4">
            <button className="bg-primary-gold text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-gold/90 transition duration-300">
              Call Now
            </button>
            <button className="bg-[#002d72] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#001d52] transition duration-300">
              Book Appointment
            </button>
          </div>
        </div>
      </div>
      
      {/* Additional Information Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/2">
              <img 
                src="/hero/hospitaldesign.png"
                alt={currentService.title}
                className="w-full h-auto rounded-lg shadow-md max-w-full"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-serif font-bold text-[#002d72] mb-4">{currentService.additionalInfo.title}</h2>
              <p className="font-sans text-[#444] mb-4 leading-relaxed">
                {currentService.additionalInfo.description}
              </p>
              <ul className="space-y-2">
                {currentService.additionalInfo.listItems.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary-gold mr-2">•</span>
                    <span className="font-sans text-[#444]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Patient Stories Carousel */}
<div className="py-12 bg-[#f9f9f9]">
  <div className="max-w-7xl mx-auto px-6 md:px-12">
    <h2 className="text-3xl font-serif font-bold text-[#002d72] text-center mb-8">
      Patient Stories
    </h2>

    {currentTestimonials.length > 0 ? (
      <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
        {currentTestimonials.map((testimonial, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[300px] md:w-[400px] bg-white rounded-xl shadow-md overflow-hidden"
          >
            <a
              href={testimonial.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={testimonial.image}
                alt={testimonial.title}
                className="w-full h-48 object-cover max-w-full"
              />
              <div className="p-4">
                <h3 className="font-serif font-bold text-[#002d72] text-lg">
                  {testimonial.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  {testimonial.description}
                </p>
              </div>
            </a>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-8">
        <p className="text-gray-500 italic">No patient stories available for this service.</p>
      </div>
    )}
  </div>
</div>
    </div>
  );
};

export default CareCenterService;
