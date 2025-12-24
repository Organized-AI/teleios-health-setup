import React, { useState } from 'react';
import { Terminal, Wrench, Bug, FileCode, Workflow, CheckCircle2, ArrowRight, Zap, Database, Globe, Server } from 'lucide-react';

export default function GTMPluginGuide() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedCommand, setExpandedCommand] = useState(null);

  const commands = [
    {
      name: '/gtm-setup',
      icon: <Workflow className="w-5 h-5" />,
      description: 'Initialize new GTM tracking architecture',
      when: 'Starting a new implementation',
      outputs: ['gtm-web-container.json', 'gtm-sgtm-container.json', 'dataLayer-script.js', 'webhook-payloads.json'],
      color: 'bg-blue-500'
    },
    {
      name: '/gtm-test',
      icon: <CheckCircle2 className="w-5 h-5" />,
      description: 'Run 7-phase testing checklist',
      when: 'Validating implementation',
      outputs: ['GTM Preview', 'Pixel Helper', 'GA4 Realtime', 'sGTM Logs', 'Events Manager', 'Ads Conversions', 'Offline Tests'],
      color: 'bg-green-500'
    },
    {
      name: '/gtm-capi',
      icon: <Server className="w-5 h-5" />,
      description: 'Configure Meta Conversions API with Stape CAPIG',
      when: 'Setting up server-side Meta tracking',
      outputs: ['CAPIG tags', 'User data mapping', 'Deduplication', 'Webhook endpoints'],
      color: 'bg-purple-500'
    },
    {
      name: '/gtm-audit',
      icon: <FileCode className="w-5 h-5" />,
      description: 'Audit existing GTM implementation',
      when: 'Reviewing or optimizing setup',
      outputs: ['Health report', 'Critical issues', 'Optimization opportunities', 'Action plan'],
      color: 'bg-orange-500'
    },
    {
      name: '/gtm-webhook',
      icon: <Database className="w-5 h-5" />,
      description: 'Configure CRM webhooks for offline conversions',
      when: 'Setting up GoHighLevel, HubSpot, etc.',
      outputs: ['Webhook payloads', 'sGTM triggers', 'Event mapping', 'Testing workflow'],
      color: 'bg-pink-500'
    }
  ];

  const agents = [
    {
      name: 'gtm-architect',
      model: 'Opus',
      icon: <Wrench className="w-6 h-6" />,
      purpose: 'Design & Planning',
      capabilities: ['Customer journey mapping', 'Data layer design', 'Tag architecture', 'Documentation'],
      prompt: 'Use gtm-architect to design tracking for my e-commerce funnel'
    },
    {
      name: 'gtm-debugger',
      model: 'Sonnet',
      icon: <Bug className="w-6 h-6" />,
      purpose: 'Troubleshooting',
      capabilities: ['Systematic diagnostics', 'Error resolution', 'Debug commands', 'Platform-specific fixes'],
      prompt: 'Use gtm-debugger to fix why Lead events fire twice'
    }
  ];

  const workflow = [
    { phase: 'Design', command: 'gtm-architect', description: 'Map journey & design architecture' },
    { phase: 'Setup', command: '/gtm-setup', description: 'Generate implementation files' },
    { phase: 'CAPI', command: '/gtm-capi', description: 'Configure server-side tracking' },
    { phase: 'CRM', command: '/gtm-webhook', description: 'Set up offline conversions' },
    { phase: 'Test', command: '/gtm-test', description: 'Validate everything works' },
    { phase: 'Audit', command: '/gtm-audit', description: 'Ongoing optimization' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">GTM Implementation Plugin</h1>
          <p className="text-gray-400">For Claude Code - Meta CAPI, GA4, Google Ads & CRM Webhooks</p>
        </div>

        {/* Installation Banner */}
        <div className="bg-gray-800 rounded-lg p-4 mb-8 border border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <Terminal className="w-5 h-5 text-green-400" />
            <span className="font-semibold">Quick Install</span>
          </div>
          <code className="block bg-black rounded p-3 text-sm font-mono">
            <span className="text-gray-500"># Add marketplace</span><br />
            <span className="text-green-400">/plugin marketplace add</span> organized-ai/teleios-health-setup<br /><br />
            <span className="text-gray-500"># Install plugin</span><br />
            <span className="text-green-400">/plugin install</span> gtm-implementation@organized-ai
          </code>
        </div>

        {/* Account Reference */}
        <div className="mt-8 bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h3 className="font-semibold mb-3">Teleios Health Account IDs</h3>
          <div className="grid md:grid-cols-3 gap-2 text-sm font-mono">
            <div className="bg-gray-900 p-2 rounded">
              <span className="text-gray-500">Meta Pixel:</span> 912613798381607
            </div>
            <div className="bg-gray-900 p-2 rounded">
              <span className="text-gray-500">GA4:</span> G-CS05KZX2HG
            </div>
            <div className="bg-gray-900 p-2 rounded">
              <span className="text-gray-500">Google Ads:</span> 17810172296
            </div>
            <div className="bg-gray-900 p-2 rounded">
              <span className="text-gray-500">Web GTM:</span> GTM-WM5S3WSG
            </div>
            <div className="bg-gray-900 p-2 rounded">
              <span className="text-gray-500">Server GTM:</span> GTM-MLBJCV38
            </div>
            <div className="bg-gray-900 p-2 rounded">
              <span className="text-gray-500">Stape:</span> capig.stape.vip
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
