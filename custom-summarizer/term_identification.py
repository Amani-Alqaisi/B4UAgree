import re

# Unused
def identify_privacy_terms(text):

    privacy_terms = []
    
    # List of privacy-related keywords
    privacy_keywords = [
        "Privacy", "Data Protection", "Personal Information", "Consent",
        "Tracking", "Cookies", "User Data", "Confidentiality", "Security",
        "GDPR", "PII", "HIPAA", "COPPA", "collect"  # Add more terms as needed
    ]
    
    # Expand keyword list with synonyms and related terms
    expanded_keywords = [
        "Privacy Policy", "Data Privacy", "Information Security",
        "Opt-in", "Opt-out", "Cookie Policy", "Privacy Notice",
        "Personal Data"  # Add more terms as needed
    ]
    
    # Combine main keywords with expanded list
    all_keywords = privacy_keywords + expanded_keywords
    
    # Search for privacy-related terms in the text
    for keyword in all_keywords:
        # Use regex to match whole words ignoring case
        matches = re.findall(r'\b{}\b'.format(re.escape(keyword)), text, re.IGNORECASE)
        privacy_terms.extend(matches)
    
    # Remove duplicates and return the list of identified terms
    return list(set(privacy_terms))
# Unused

# Define fixed topics and their associated keywords
topics_keywords = {
    "Data Collection and Usage": [
        "personal information", "data categories", "collection methods",
        "purpose of collection", "consent", "cookies", "tracking technologies",
        "user activity", "location data", "device information",
        "analytics", "profile creation", "communication preferences",
        "account registration", "surveys and feedback", "social media integration",
        "third-party data sources", "data retention", "data deletion", "data aggregation",
        "data analysis", "user behavior", "data utilization", "information gathering",
        "data storage", "data processing", "data tracking", "data usage policies"
    ],
    "Data Sharing and Disclosure": [
        "third parties", "sharing practices", "partnerships",
        "advertising networks", "service providers", "legal requirements",
        "consent agreements", "affiliate programs", "data transfers",
        "data sales", "data anonymization", "data pseudonymization",
        "data licensing", "business transactions", "merger or acquisition",
        "publicly available information", "aggregated data",
        "cross-border transfers", "data processing agreements", "data breach response",
        "information exchange", "data dissemination", "data distribution",
        "sharing protocols", "data disclosure", "data access", "data transmission"
    ],
    "Data Security Measures": [
        "encryption", "secure protocols", "access controls",
        "authentication methods", "firewall protection", "intrusion detection",
        "security audits", "vulnerability assessments", "data encryption in transit",
        "data encryption at rest", "secure storage", "incident response plan",
        "data minimization", "data masking", "two-factor authentication",
        "secure sockets layer (ssl)", "transport layer security (tls)",
        "security certifications", "compliance standards", "security training and awareness",
        "data integrity", "data protection", "data confidentiality",
        "data security protocols", "data safeguarding", "data hygiene", "security measures"
    ],
    "User Rights and Controls": [
        "access rights", "rectification", "data portability",
        "data deletion", "consent withdrawal", "opt-out mechanisms",
        "privacy settings", "cookie preferences", "marketing preferences",
        "account management", "privacy dashboard", "privacy policies review",
        "user profiles", "account deletion", "data export",
        "data correction", "data restriction", "data erasure",
        "data retention policies", "user support channels",
        "data ownership", "user consent", "user preferences",
        "user privacy rights", "user control", "user data management",
        "user data access", "children's data", "parental consent",
        "coppa compliance", "children's privacy rights", "child data protection",
        "child account management", "child data deletion", "child data access",
        "child", "children", "child data",
        "parental controls", "age verification", "age-appropriate content",
        "child online safety", "child data collection", "aware"
    ],
    "Policy Updates and Notifications": [
        "policy changes", "updates", "modifications",
        "notification methods", "email notifications", "website banners",
        "privacy alerts", "opt-in notifications", "opt-out notifications",
        "consent reminders", "revision history", "version control",
        "review frequency", "compliance updates", "legal changes",
        "data protection laws", "privacy regulations", "transparency reports",
        "communication", "notification preferences",
        "policy amendments", "policy revisions", "policy alerts",
        "policy compliance", "policy notifications", "policy review",
        "policy transparency",
        "opt-out option", "opt-out preferences", "opt-out requests", 
        "feedback", "concerns", "suggestions",
        "feedback", "inquiries", "complaints",
        "user support", "assistance", "help",
        "customer service", "user satisfaction", "experience",
        "engagement"
    ]
}


#Assign a paragraph to a topic based on the number of matching keywords.
def assign_paragraph_to_topic(paragraph, topics_keywords):
    
    max_match_count = 0
    assigned_topic = "Other"  # Default to "Other" if no specific topic is identified

    # Iterate through each topic and its associated keywords
    for topic, keywords in topics_keywords.items():
        match_count = 0
        # Count the number of matching keywords in the paragraph
        for keyword in keywords:
            if keyword in paragraph.lower():
                match_count += 1
        # Update the assigned topic if the current topic has more matching keywords
        if match_count > max_match_count:
            max_match_count = match_count
            assigned_topic = topic

    return assigned_topic
